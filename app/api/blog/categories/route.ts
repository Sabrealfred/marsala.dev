// Marsala OS - Blog Categories API
// GET /api/blog/categories - Fetch all blog categories

import { NextRequest, NextResponse } from 'next/server';
import { createClientForRouteHandler } from '@/lib/supabase/server';
import type { BlogCategory, BlogPost, ContentStatus } from '@/lib/supabase/types';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClientForRouteHandler();

    // Fetch all categories ordered by sort_order
    const { data, error } = await supabase
      .from('blog_categories')
      .select(
        `
        *,
        blog_posts!blog_posts_category_id_fkey (
          id,
          status
        )
      `
      )
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching blog categories:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blog categories' },
        { status: 500 }
      );
    }

    // Count published posts per category
    type CategoryWithPosts = BlogCategory & {
      blog_posts: Pick<BlogPost, 'id' | 'status'>[];
    };

    const categoriesWithCount = data.map((category) => {
      const { blog_posts, ...categoryData } = category as CategoryWithPosts;
      const publishedPosts = blog_posts?.filter((post) => post.status === 'published') || [];
      return {
        ...categoryData,
        post_count: publishedPosts.length,
      };
    });

    return NextResponse.json({ data: categoriesWithCount });
  } catch (error) {
    console.error('Error in blog categories API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
