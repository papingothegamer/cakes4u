// app/api/delete-account/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { userId } = await request.json();

    // Verify user session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Perform server-side deletion tasks
    // 1. Delete user data from related tables
    await supabase.from("user_preferences").delete().eq("user_id", userId);
    await supabase.from("user_settings").delete().eq("user_id", userId);
    // Add more table cleanups as needed

    // 2. Implement RLS policy to prevent deleted users from accessing data
    await supabase.rpc("mark_user_deleted", { user_id: userId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error during account deletion:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}