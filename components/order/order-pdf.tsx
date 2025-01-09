import jsPDF from "jspdf";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { OrderDetails, ContactDetails } from "@/types/order";

type OrderPDFProps = {
  orderNumber: string;
  orderDetails: OrderDetails;
  contactDetails: ContactDetails;
  imageKeys?: string[]; // List of image keys from Supabase bucket
};

export async function generateOrderPDF({
  orderNumber,
  orderDetails,
  contactDetails,
  imageKeys,
}: OrderPDFProps) {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text(`Order Summary #${orderNumber}`, 105, 20, { align: "center" });

  // Order Details Section
  doc.setFontSize(14);
  doc.text("Order Details", 10, 40);
  doc.setFontSize(12);
  doc.text(`Type: ${orderDetails.type}`, 10, 50);
  doc.text(`Servings: ${orderDetails.servings}`, 10, 60);
  doc.text(`Occasion: ${orderDetails.occasion}`, 10, 70);
  doc.text(`Delivery Date: ${format(orderDetails.deliveryDate, "PPP")}`, 10, 80);

  if (orderDetails.description) {
    doc.text(`Description: ${orderDetails.description}`, 10, 90);
  }
  if (orderDetails.allergyInfo) {
    doc.text(`Allergy Info: ${orderDetails.allergyInfo}`, 10, 100);
  }

  // Contact Details Section
  doc.setFontSize(14);
  doc.text("Contact Information", 10, 120);
  doc.setFontSize(12);
  doc.text(`Name: ${contactDetails.name}`, 10, 130);
  doc.text(`Email: ${contactDetails.email}`, 10, 140);
  doc.text(`Phone: ${contactDetails.phone}`, 10, 150);
  doc.text(`Address: ${contactDetails.address}`, 10, 160);

  // Reference Images Section
  if (imageKeys && imageKeys.length > 0) {
    const images = await fetchImagesFromSupabase(imageKeys);
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Reference Images", 10, 20);

    let yPosition = 30; // Start position for images
    const imageWidth = 50; // Adjust width
    const imageHeight = 50; // Adjust height

    // Filter out any null values and only process valid image URLs
    const validImages = images.filter((url) => url !== null);

    for (const imageUrl of validImages) {
      doc.addImage(imageUrl, "WEBP", 10, yPosition, imageWidth, imageHeight);
      yPosition += imageHeight + 10; // Move to the next position
      if (yPosition + imageHeight > 280) {
        doc.addPage();
        yPosition = 20;
      }
    }
  }

  // Save the PDF
  doc.save(`order-summary-${orderNumber}.pdf`);
}

// Function to fetch image URLs from Supabase
async function fetchImagesFromSupabase(imageKeys: string[]): Promise<(string | null)[]> {
  const signedUrls: (string | null)[] = [];

  for (const key of imageKeys) {
    const { data, error } = await supabase.storage
      .from("order-images")
      .createSignedUrl(key, 60 * 60); // URL valid for 1 hour

    if (error) {
      console.error(`Error fetching signed URL for ${key}:`, error.message);
      signedUrls.push(null);
    } else {
      signedUrls.push(data?.signedUrl || null);
    }
  }

  return signedUrls;
}
