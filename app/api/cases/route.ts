import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { CaseStudy } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const industry = searchParams.get('industry');
    const isFeatured = searchParams.get('is_featured');

    // Create Supabase client for route handler
    const supabase = await createClientForRouteHandler();

    // Build query - only return published case studies
    let query = supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    // Filter by industry if provided
    if (industry) {
      query = query.eq('industry', industry);
    }

    // Filter by featured status if provided
    if (isFeatured !== null) {
      const featured = isFeatured === 'true';
      query = query.eq('is_featured', featured);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch case studies' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: data as CaseStudy[],
        count: data?.length || 0
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Case studies API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
