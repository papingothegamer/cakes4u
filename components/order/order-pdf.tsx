import jsPDF from "jspdf";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";
import { OrderDetails, ContactDetails } from "@/types/order";

type OrderPDFProps = {
  orderNumber: string;
  orderDetails: OrderDetails;
  contactDetails: ContactDetails;
  imageKeys?: string[];
};

export async function generateOrderPDF({
  orderNumber,
  orderDetails,
  contactDetails,
  imageKeys,
}: OrderPDFProps) {
  const doc = new jsPDF();

  // Define colors
  const primaryColor = "#FF69B4"; // Hot Pink
  const secondaryColor = "#8A2BE2"; // Blue Violet

  // Add logo
  const logoUrl = "api/images/logo.png"; // Replace with your actual logo path
  doc.addImage(logoUrl, "PNG", 10, 10, 30, 30);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(primaryColor);
  doc.text("Cakes4U", 105, 30, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(secondaryColor);
  doc.text(`Order Summary #${orderNumber}`, 105, 45, { align: "center" });

  // Decorative line
  doc.setDrawColor(primaryColor);
  doc.setLineWidth(0.5);
  doc.line(10, 50, 200, 50);

  // Order Details Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text("Order Details", 10, 65);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  let yPos = 75;
  const lineHeight = 7;

  const addDetailLine = (label: string, value: string) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 10, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value, 50, yPos);
    yPos += lineHeight;
  };

  addDetailLine("Type", orderDetails.type);
  addDetailLine("Servings", orderDetails.servings.toString());
  addDetailLine("Occasion", orderDetails.occasion);
  addDetailLine("Delivery Date", format(orderDetails.deliveryDate, "PPP"));

  if (orderDetails.description) {
    addDetailLine("Description", orderDetails.description);
  }
  if (orderDetails.allergyInfo) {
    addDetailLine("Allergy Info", orderDetails.allergyInfo);
  }

  // Contact Details Section
  yPos += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(primaryColor);
  doc.text("Contact Information", 10, yPos);
  yPos += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  addDetailLine("Name", contactDetails.name);
  addDetailLine("Email", contactDetails.email);
  addDetailLine("Phone", contactDetails.phone);
  addDetailLine("Address", contactDetails.address);

  // Fallback Message for Missing Images
  const fallbackMessage = `Please attach your image with this form and send it to cakes4ufoods@gmail.com with the subject "Order #${orderNumber}"`;

  // Check if we have images
  if (imageKeys && imageKeys.length > 0) {
    const images = await fetchImagesFromSupabase(imageKeys);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(primaryColor);
    doc.text("Reference Images", 105, yPos + 20, { align: "center" });

    // Decorative line
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(10, yPos + 25, 200, yPos + 25);

    let yPosition = yPos + 35;
    const imageWidth = 80;
    const imageHeight = 80;
    let xPosition = 10;

    // Filter out null images
    const validImages = images.filter((url) => url !== null);

    if (validImages.length === 0) {
      // Add fallback text if no valid images
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      // Center the fallback message
      doc.text(fallbackMessage, 105, yPosition, { align: "center" });
    } else {
      // Add images if valid ones exist
      for (let i = 0; i < validImages.length; i++) {
        const imageUrl = validImages[i];
        if (imageUrl) {
          const imageType = imageUrl.split('.').pop()?.toUpperCase();
          let imageFormat: "PNG" | "JPG" | "WEBP" = "WEBP"; // Default to WEBP

          if (imageType === "PNG") {
            imageFormat = "PNG";
          } else if (imageType === "JPG" || imageType === "JPEG") {
            imageFormat = "JPG";
          }

          doc.addImage(imageUrl, imageFormat, xPosition, yPosition, imageWidth, imageHeight);

          if ((i + 1) % 2 === 0) {
            xPosition = 10;
            yPosition += imageHeight + 10;
          } else {
            xPosition += imageWidth + 10;
          }

          if (yPosition + imageHeight > 260) {
            break; // Prevent going over the page limit
          }
        }
      }

      // If there are still no images or if there's space left, add the fallback message
      if (validImages.length === 0 || yPosition + imageHeight >= 260) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(fallbackMessage, 105, yPosition + 10, { align: "center" });
      }
    }
  } else {
    // If no imageKeys, add fallback message directly
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(fallbackMessage, 105, yPos + 20, { align: "center" });
  }

  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(secondaryColor);
  doc.text("Cakes4U - Making your moments sweeter!", 105, 280, { align: "center" });
  doc.text(" +46 76 745 74 19 | cakes4ufoods.vercel.app", 105, 285, { align: "center" });

  // Save the PDF
  doc.save(`cakes4u-order-${orderNumber}.pdf`);
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
