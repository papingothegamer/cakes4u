import { supabase } from "@/lib/supabase";

export async function uploadOrderImages(orderId: string, files: File[]) {
  const results = [];
  const errors = [];

  for (const file of files) {
    try {
      const fileName = `${orderId}/${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("order-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("order-images")
        .getPublicUrl(fileName);

      results.push({ fileName, url: publicUrl });
    } catch (error: any) {
      errors.push({ fileName: file.name, error: error.message });
    }
  }

  if (errors.length > 0) {
    console.error("Image upload errors:", errors);
  }

  return { results, errors };
}