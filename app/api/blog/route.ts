// Marsala OS - Blog Posts API
// GET /api/blog - Fetch all published blog posts with optional filtering

import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { BlogPost } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientForRouteHandler();
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Filter parameters
    const categoryId = searchParams.get('category_id');
    const tags = searchParams.get('tags')?.split(',').filter(Boolean);

    // Build query
    let query = supabase
      .from('blog_posts')
      .select(
        `
        *,
        blog_categories (
          id,
          slug,
          name,
          description,
          icon,
          color
        ),
        profiles:author_id (
          id,
          full_name,
          avatar_url
        )
      `,
        { count: 'exact' }
      )
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Apply filters
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (tags && tags.length > 0) {
      query = query.overlaps('tags', tags);
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching blog posts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog posts' },
        { status: 500 }
      );
    }

    // Calculate pagination metadata
    const totalPages = count ? Math.ceil(count / limit) : 0;
    const hasMore = page < totalPages;

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
