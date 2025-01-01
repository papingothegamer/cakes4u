// app/api/delete-account/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { userId } = await request.json();

    // Verify user session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || session.user.id !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete user data from custom tables
    const tablesToDeleteFrom = ["user_preferences", "user_settings", "profiles"];
    for (const table of tablesToDeleteFrom) {
      const { error } = await supabase.from(table).delete().eq("user_id", userId);
      if (error) {
        console.error(`Error deleting from table ${table}:`, error);
        return NextResponse.json(
          { error: `Failed to delete data from ${table}` },
          { status: 500 }
        );
      }
    }

    // Delete user from auth.users
    const serviceSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key
    );

    const { error: adminError } = await serviceSupabase.auth.admin.deleteUser(userId);
    if (adminError) {
      console.error("Error deleting user from auth.users:", adminError);
      return NextResponse.json(
        { error: "Failed to delete user from auth.users" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error during account deletion:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
