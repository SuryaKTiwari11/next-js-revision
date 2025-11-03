import Link from "next/link";
// import { useRouter } from "next/router";
interface Props {
  // In newer Next versions `params` can be a Promise that must be awaited.
  params: Promise<{ id: string }> | { id: string };
}

export default async function PostPage({ params }: Props) {
  // unwrap params if it's a Promise
  const { id } = (await params) as { id: string };

  let post: any = { title: `Post ${id}`, body: "" };
  let comments: any[] = [];

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1> THE ID OF THIS PAGE IS {id} surya</h1>

      {/* simple link styled as a button that navigates to the comments page */}
      <Link
        href={`/posts/${id}/comments`}
        className="inline-block mt-3 mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Comments
      </Link>
      <h1 className="text-2xl font-semibold mb-2">{post.title}</h1>
      {post.body && <p className="mb-4 text-gray-700">{post.body}</p>}

      <h2 className="text-lg font-medium mb-2">Comments</h2>
      <ul className="space-y-2 mb-6">
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

      <Link href="/posts" className="text-sm text-blue-600 hover:underline">
        ← Back to posts
      </Link>
    </main>
  );
}

//we use useRouter when we want to navigate programmatically or access route parameters in a client component.
//we use useRouter in client components because hooks can only be used in client-side code.
// we use next/link for navigation in server components like this one.
//
