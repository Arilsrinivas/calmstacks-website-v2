import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateRegistrationStatus } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const timestamp = req.headers.get("x-webhook-timestamp");
    const signature = req.headers.get("x-webhook-signature");

    if (!timestamp || !signature) {
      console.warn("Webhook received with missing headers. timestamp:", timestamp, "signature:", signature);
      return new Response("Missing signature or timestamp headers", { status: 400 });
    }

    // 1. Verify Webhook Signature
    const clientSecret = process.env.CASHFREE_CLIENT_SECRET || "";
    const computedSignature = crypto
      .createHmac("sha256", clientSecret)
      .update(timestamp + rawBody)
      .digest("base64");

    if (computedSignature !== signature) {
      console.error("Webhook signature verification failed.");
      return new Response("Invalid signature", { status: 401 });
    }

    // 2. Parse Webhook Event
    const payload = JSON.parse(rawBody);
    console.log("Webhook payload signature verified. Event type:", payload.type);

    if (payload.type === "PAYMENT_SUCCESS") {
      const orderId = payload.data.order.order_id;
      const paymentId = payload.data.payment.cf_payment_id;
      const paymentStatus = payload.data.payment.payment_status;

      if (paymentStatus === "SUCCESS") {
        console.log(`Payment SUCCESS for order: ${orderId}, paymentId: ${paymentId}`);
        await updateRegistrationStatus(orderId, "SUCCESS", paymentId);
      } else {
        console.log(`Payment failed/other for order: ${orderId}, status: ${paymentStatus}`);
        await updateRegistrationStatus(orderId, "FAILED", paymentId);
      }
    } else if (payload.type === "PAYMENT_FAILED_WEBHOOK") {
      const orderId = payload.data.order.order_id;
      const paymentId = payload.data.payment.cf_payment_id;
      console.log(`Payment FAILED for order: ${orderId}, paymentId: ${paymentId}`);
      await updateRegistrationStatus(orderId, "FAILED", paymentId);
    } else {
      console.log(`Unhandled webhook event type: ${payload.type}`);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Cashfree webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
