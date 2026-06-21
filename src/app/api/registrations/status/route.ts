import { NextResponse } from "next/server";
import { getRegistrationByRazorpayOrderId, updateRegistrationStatus } from "@/lib/db";
import { sendHackathonEmails } from "@/lib/mailer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      return NextResponse.json({ error: "order_id parameter is required." }, { status: 400 });
    }

    const registration = getRegistrationByRazorpayOrderId(orderId);
    if (!registration) {
      return NextResponse.json({ error: "Registration not found." }, { status: 404 });
    }

    // If already SUCCESS, return immediately
    if (registration.payment_status === "SUCCESS") {
      return NextResponse.json({
        status: registration.payment_status,
        registration,
      });
    }

    // Fallback order sync check directly with Razorpay
    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || "";
    const authString = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");

    const rzpUrl = `https://api.razorpay.com/v1/orders/${orderId}`;
    console.log(`Verifying payment directly via Razorpay: ${rzpUrl}`);

    try {
      const response = await fetch(rzpUrl, {
        headers: {
          Authorization: `Basic ${authString}`,
        },
      });

      if (response.ok) {
        const orderData = await response.json();
        
        if (orderData.status === "paid") {
          // Fetch payment ID from payments list
          let paymentId = "";
          try {
            const paymentsResponse = await fetch(`https://api.razorpay.com/v1/orders/${orderId}/payments`, {
              headers: {
                Authorization: `Basic ${authString}`,
              },
            });
            if (paymentsResponse.ok) {
              const paymentsData = await paymentsResponse.json();
              if (paymentsData && Array.isArray(paymentsData.items) && paymentsData.items.length > 0) {
                const captured = paymentsData.items.find((p: any) => p.status === "captured");
                if (captured) {
                  paymentId = captured.id;
                } else {
                  paymentId = paymentsData.items[0].id;
                }
              }
            }
          } catch (payErr) {
            console.error("Error fetching payments list from Razorpay:", payErr);
          }

          console.log(`Razorpay shows order ${orderId} is paid. Syncing status to SUCCESS.`);
          const updatedReg = updateRegistrationStatus(orderId, "SUCCESS", paymentId);
          
          if (updatedReg) {
            // Trigger confirmation emails
            sendHackathonEmails(updatedReg).then((success) => {
              if (!success) {
                console.error("SMTP failed, but registration status was successfully synced to SUCCESS.");
              }
            });

            return NextResponse.json({
              status: "SUCCESS",
              registration: updatedReg,
            });
          }
        }
      }
    } catch (err) {
      console.error("Error connecting to Razorpay for order verification:", err);
    }

    return NextResponse.json({
      status: registration.payment_status,
      registration,
    });
  } catch (error: any) {
    console.error("Verification status endpoint error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred checking registration status." },
      { status: 500 }
    );
  }
}
