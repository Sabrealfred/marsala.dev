import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { CaseStudy } from '@/lib/supabase/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Case study slug is required' },
        { status: 400 }
      );
    }

    // Create Supabase client for route handler
    const supabase = await createClientForRouteHandler();

    // Query for published case study by slug
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Case study not found' },
          { status: 404 }
        );
      }
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch case study' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data as CaseStudy
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Case study API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
