import { NextResponse } from "next/server";
import { getRegistrationByOrderId, updateRegistrationStatus } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "order_id parameter is required." }, { status: 400 });
    }

    const registration = getRegistrationByOrderId(orderId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found." }, { status: 404 });
    }

    // If the payment is already SUCCESS, return it immediately
    if (registration.paymentStatus === "SUCCESS") {
      return NextResponse.json({
        status: registration.paymentStatus,
        registration,
      });
    }

    // Otherwise, double check directly with Cashfree in case the webhook is delayed
    const isProd = process.env.CASHFREE_ENV === "production";
    const cfPaymentsUrl = isProd
      ? `https://api.cashfree.com/pg/orders/${orderId}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`;

    console.log(`Checking Cashfree payment status at: ${cfPaymentsUrl}`);

    try {
      const response = await fetch(cfPaymentsUrl, {
        method: "GET",
        headers: {
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_CLIENT_ID || "",
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET || "",
        },
      });

      if (response.ok) {
        const paymentsList = await response.json();
        
        if (Array.isArray(paymentsList) && paymentsList.length > 0) {
          // Look for any successful payment attempt
          const successfulPayment = paymentsList.find(
            (p: any) => p.payment_status === "SUCCESS"
          );

          if (successfulPayment) {
            console.log(`Found successful payment in Cashfree list for order: ${orderId}`);
            const updatedReg = updateRegistrationStatus(
              orderId,
              "SUCCESS",
              successfulPayment.cf_payment_id.toString()
            );
            if (updatedReg) {
              return NextResponse.json({
                status: "SUCCESS",
                registration: updatedReg,
              });
            }
          } else {
            // Check if there are failed attempts
            const failedPayment = paymentsList.find(
              (p: any) => ["FAILED", "USER_DROPPED"].includes(p.payment_status)
            );
            if (failedPayment) {
              console.log(`Found failed/dropped payment in Cashfree list for order: ${orderId}`);
              const updatedReg = updateRegistrationStatus(
                orderId,
                "FAILED",
                failedPayment.cf_payment_id.toString()
              );
              if (updatedReg) {
                return NextResponse.json({
                  status: "FAILED",
                  registration: updatedReg,
                });
              }
            }
          }
        }
      } else {
        console.error(`Cashfree API returned error ${response.status} when checking payment.`);
      }
    } catch (cfError) {
      console.error("Error calling Cashfree API to verify payment status:", cfError);
      // Fallback to local DB status in case Cashfree is unreachable
    }

    return NextResponse.json({
      status: registration.paymentStatus,
      registration,
    });
  } catch (error: any) {
    console.error("Status check endpoint error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred checking registration status." },
      { status: 500 }
    );
  }
}
