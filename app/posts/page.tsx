import Link from "next/link";

export default async function PostsPage() {
  let posts: any[] = [];

  try {
    const res = await fetch("/api/posts", { cache: "no-store" });
    const data = await res.json().catch(() => ({ posts: [] }));
    posts = data.posts ?? [];
  } catch {
    posts = [];
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Posts</h1>

      <ul className="space-y-2">
        {posts.length === 0 ? (
          <li className="text-gray-500">No posts</li>
        ) : (
          posts.map((p: any) => (
            <li key={p.id}>
              <Link
                href={`/posts/${p.id}`}
                className="text-blue-600 hover:underline"
              >
                {p.title ?? `Post ${p.id}`}
              </Link>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
