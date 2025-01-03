import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateCustomerEmail, generateBusinessEmail } from "@/lib/email/templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const BUSINESS_EMAIL = "cakes4ufoods@gmail.com";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const { orderId, orderDetails, contactDetails } = await request.json();

    // Send customer confirmation
    const customerEmail = generateCustomerEmail(orderId, orderDetails, contactDetails);
    const customerResult = await resend.emails.send({
      from: "Cakes4U <cakes4ufoods@gmail.com>",
      to: contactDetails.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
    });

    console.log("Customer email sent:", customerResult);

    // Send business notification
    const businessEmail = generateBusinessEmail(orderId, orderDetails, contactDetails);
    const businessResult = await resend.emails.send({
      from: "Cakes4U Orders <cakes4ufoods@gmail.com>",
      to: BUSINESS_EMAIL,
      subject: businessEmail.subject,
      html: businessEmail.html,
    });

    console.log("Business email sent:", businessResult);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send emails:", error);
    return NextResponse.json(
      { error: "Failed to send order confirmation emails" },
      { status: 500 }
    );
  }
}

