import type { Metadata } from "next";

// Mock data
const blogPosts: Record<
  string,
  { id: string; title: string; body: string; author: string; date: string }
> = {
  "1": {
    id: "1",
    title: "next.js",
    body: "Next.js is a React framework for production - it makes building fullstack React apps and sites a breeze.",
    author: "shoo",
    date: "2026-07-09",
  },
  "2": {
    id: "2",
    title: "TypeScript Tips & Tricks",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Jane Smith",
    date: "2026-07-08",
  },
};

async function fetchPost(id: string) {
  return blogPosts[id] || null;
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.body.slice(0, 160),
  };
}

export default async function BlogPost({ params }: Props) {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-red-500">บทความไม่พบ</h1>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto p-8">
      <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-6">
        <span>{post.author}</span> • <time>{post.date}</time>
      </div>
      <div className="prose prose-lg max-w-none">
        <p>{post.body}</p>
      </div>
    </article>
  );
}
