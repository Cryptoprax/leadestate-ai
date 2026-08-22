import { NextResponse } from "next/server";
import { RazorpayService } from "@/features/vayon/billing/services/razorpay.service";
export async function POST(request: Request) {
  const signature = request.headers.get("x-razorpay-signature"),
    eventId = request.headers.get("x-razorpay-event-id");
  if (!signature || !eventId)
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  try {
    await new RazorpayService().webhook(
      await request.text(),
      signature,
      eventId,
    );
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
