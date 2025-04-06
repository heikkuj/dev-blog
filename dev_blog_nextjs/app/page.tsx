import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]{_id, title, slug, date}|order(date desc)`);

export default async function IndexPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">Posts</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {posts.map((post: any) => (
          <li className="bg-white p-4 rounded-lg" key={post._id}>
            <Link
              className="hover:underline"
              href={`/posts/${post?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              {post?.date && (
                <p className="text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}