import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler, createAdminClient } from '@/lib/supabase/server';
import type { Setting } from '@/lib/supabase/types';

/**
 * Helper function to check if user is an admin
 */
async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClientForRouteHandler();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return false;
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single<{ role: string }>();

    if (profileError || !profile) {
      return false;
    }

    return profile.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * GET /api/settings
 * Returns all settings (public only for unauthenticated, all for admin)
 */
export async function GET(request: NextRequest) {
  try {
    const adminCheck = await isAdmin();
    const supabase = createAdminClient();

    let query = supabase
      .from('settings')
      .select('*')
      .order('key', { ascending: true });

    // If not admin, only return public settings
    if (!adminCheck) {
      query = query.eq('is_public', true);
    }

    const { data: settings, error } = await query;

    if (error) {
      console.error('Error fetching settings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    // Return settings as key-value object
    const settingsObject = ((settings || []) as Setting[]).reduce((acc, setting) => {
      acc[setting.key] = {
        value: setting.value,
        description: setting.description,
        is_public: setting.is_public,
        updated_at: setting.updated_at,
      };
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({
      success: true,
      data: settingsObject,
      count: (settings || []).length,
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Updates multiple settings at once (admin only)
 *
 * Body: {
 *   settings: {
 *     "key1": { value: any, description?: string, is_public?: boolean },
 *     "key2": { value: any, description?: string, is_public?: boolean }
 *   }
 * }
 */
export async function PUT(request: NextRequest) {
  try {
    // Check admin authentication
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // Get authenticated user ID for tracking
    const supabase = await createClientForRouteHandler();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || null;

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body. Expected { settings: {...} }' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();
    const updates: Setting[] = [];
    const errors: { key: string; error: string }[] = [];

    // Process each setting
    for (const [key, settingData] of Object.entries(settings)) {
      if (!settingData || typeof settingData !== 'object' || !('value' in settingData)) {
        errors.push({ key, error: 'Invalid setting data. Must include "value" field.' });
        continue;
      }

      const { value, description, is_public } = settingData as any;

      try {
        // Upsert the setting
        const { data, error } = await adminClient
          .from('settings')
          .upsert({
            key,
            value,
            description: description || null,
            is_public: is_public !== undefined ? is_public : false,
            updated_at: new Date().toISOString(),
            updated_by: userId,
          } as any, {
            onConflict: 'key'
          })
          .select()
          .single() as { data: Setting | null; error: any };

        if (error) {
          errors.push({ key, error: error.message });
        } else if (data) {
          updates.push(data);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        errors.push({ key, error: errorMessage });
      }
    }

    // Return results
    return NextResponse.json({
      success: errors.length === 0,
      updated: updates.length,
      errors: errors.length > 0 ? errors : undefined,
      data: updates,
    }, {
      status: errors.length > 0 ? 207 : 200 // 207 Multi-Status if partial success
    });

  } catch (error) {
    console.error('Settings PUT error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
