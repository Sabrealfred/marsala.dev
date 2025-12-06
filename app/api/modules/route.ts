import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { Module } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientForRouteHandler();
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    // Build query - only return active modules
    let query = supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    // Filter by category if provided
    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch modules' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data as Module[],
        count: data?.length || 0
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Modules API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
