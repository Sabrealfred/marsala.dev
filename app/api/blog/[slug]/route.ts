// Marsala OS - Single Blog Post API
// GET /api/blog/[slug] - Fetch single blog post by slug and increment view count

import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { BlogPost, Database } from '@/lib/supabase/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await createClientForRouteHandler();
    const { slug } = params;

    // Fetch the blog post
    const { data, error } = await supabase
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
          avatar_url,
          company
        )
      `
      )
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }

      console.error('Error fetching blog post:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog post' },
        { status: 500 }
      );
    }

    // Increment view count asynchronously (don't wait for it)
    // Note: Type assertion needed due to Supabase RPC typing limitation with function parameters
    void supabase.rpc('increment_post_views', {
      post_slug: slug,
    } as any);

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in blog post API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
