import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { Module } from '@/lib/supabase/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await createClientForRouteHandler();
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Module slug is required' },
        { status: 400 }
      );
    }

    // Query for active module by slug
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Module not found' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch module' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data as Module
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Module API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
