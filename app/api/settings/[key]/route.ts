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
 * GET /api/settings/[key]
 * Returns a single setting by key
 * Public settings available to all, private settings require admin
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;

    if (!key) {
      return NextResponse.json(
        { error: 'Setting key is required' },
        { status: 400 }
      );
    }

    const adminCheck = await isAdmin();
    const supabase = createAdminClient();

    const { data: setting, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .single() as { data: Setting | null; error: any };

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Setting not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching setting:', error);
      return NextResponse.json(
        { error: 'Failed to fetch setting' },
        { status: 500 }
      );
    }

    // Check if user has permission to view this setting
    if (!setting?.is_public && !adminCheck) {
      return NextResponse.json(
        { error: 'Unauthorized. This setting is private.' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        key: setting?.key,
        value: setting?.value,
        description: setting?.description,
        is_public: setting?.is_public,
        updated_at: setting?.updated_at,
        ...(adminCheck && { updated_by: setting?.updated_by })
      }
    });
  } catch (error) {
    console.error('Setting GET error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings/[key]
 * Updates or creates a single setting (admin only)
 *
 * Body: {
 *   value: any,
 *   description?: string,
 *   is_public?: boolean
 * }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    // Check admin authentication
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { key } = await params;

    if (!key) {
      return NextResponse.json(
        { error: 'Setting key is required' },
        { status: 400 }
      );
    }

    // Get authenticated user ID for tracking
    const supabase = await createClientForRouteHandler();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || null;

    const body = await request.json();
    const { value, description, is_public } = body;

    // Validate that value is provided
    if (value === undefined) {
      return NextResponse.json(
        { error: 'Setting value is required' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Upsert the setting
    const { data: settingData, error } = await adminClient
      .from('settings')
      .upsert({
        key,
        value,
        description: description !== undefined ? description : null,
        is_public: is_public !== undefined ? is_public : false,
        updated_at: new Date().toISOString(),
        updated_by: userId,
      } as any, {
        onConflict: 'key'
      })
      .select()
      .single() as { data: Setting | null; error: any };

    if (error) {
      console.error('Error updating setting:', error);
      return NextResponse.json(
        { error: 'Failed to update setting' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: settingData,
      message: 'Setting updated successfully'
    });

  } catch (error) {
    console.error('Setting PUT error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/settings/[key]
 * Deletes a setting (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    // Check admin authentication
    const adminCheck = await isAdmin();
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { key } = await params;

    if (!key) {
      return NextResponse.json(
        { error: 'Setting key is required' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Delete the setting
    const { error } = await adminClient
      .from('settings')
      .delete()
      .eq('key', key);

    if (error) {
      console.error('Error deleting setting:', error);
      return NextResponse.json(
        { error: 'Failed to delete setting' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Setting deleted successfully'
    });

  } catch (error) {
    console.error('Setting DELETE error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
