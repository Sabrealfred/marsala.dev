import { NextRequest, NextResponse } from "next/server";
import { createClientForRouteHandler } from "@/lib/supabase/server";

/**
 * OAuth Callback Handler
 *
 * This route handles the OAuth callback from providers like Google and GitHub.
 * It exchanges the authorization code for a session and redirects the user.
 *
 * Flow:
 * 1. User initiates OAuth login (from /login or /register)
 * 2. User authenticates with provider (Google/GitHub)
 * 3. Provider redirects back to this route with a code
 * 4. We exchange the code for a session
 * 5. Redirect user to their intended destination
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";

  // Get error parameters that might be passed by the OAuth provider
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");

  // Handle OAuth errors
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(
        errorDescription || "Authentication failed. Please try again."
      )}`
    );
  }

  // Validate that we have a code
  if (!code) {
    console.error("No code provided in OAuth callback");
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(
        "Invalid authentication response. Please try again."
      )}`
    );
  }

  try {
    const supabase = await createClientForRouteHandler();

    // Exchange the code for a session
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(
          "Failed to complete authentication. Please try again."
        )}`
      );
    }

    if (!data.session) {
      console.error("No session created after code exchange");
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(
          "Failed to create session. Please try again."
        )}`
      );
    }

    // Successful authentication - redirect to intended destination
    // You can customize this redirect based on user role, first-time login, etc.
    const redirectUrl = `${requestUrl.origin}${next}`;

    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("Unexpected error in auth callback:", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(
        "An unexpected error occurred. Please try again."
      )}`
    );
  }
}
