import Link from "next/link";

interface Props {
  params: { id: string };
}

export default async function CommentsPage({ params }: Props) {
  const { id } = params;

  let comments: any[] = [];

  try {
    const res = await fetch(`/api/posts/${id}/comments`, {
      cache: "no-store",
    }).catch(() => null);
    if (res) {
      const data = await res.json().catch(() => ({ comments: [] }));
      comments = data.comments ?? [];
    }
  } catch {
    comments = [];
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Comments for post {id}</h1>

      <ul className="space-y-3">
        {comments.length === 0 ? (
          <li className="text-gray-500">No comments</li>
        ) : (
          comments.map((c: any, i: number) => (
            <li key={i} className="p-3 bg-gray-50 rounded border">
              {c.text ?? JSON.stringify(c)}
            </li>
          ))
        )}
      </ul>

      <p className="mt-6">
        <Link href={`/posts/${id}`} className="text-blue-600 hover:underline">
          ← Back to post
        </Link>
      </p>
    </main>
  );
}
