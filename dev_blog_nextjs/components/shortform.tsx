// import Link from "next/link";
import { defineQuery, PortableText } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
// import { client } from "@/sanity/client";

const POSTS_QUERY_SHORT = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && format match "short-format"
][0]{_id, title, slug, publishedAt, body}`);

export default async function ShortForm() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY_SHORT });

  return (
    <div className="flex w-[90vw]">
      <div className="flex gap-12 w-[90vw]">
          <div className="bg-white p-4 rounded-lg" key={posts._id}>

            {/* Timestamp */}
            <div className="flex flex-row gap-2 text-gray-500 font-handjet font-medium text-lg">
            {posts?.publishedAt && (
                <p className="">{new Date(posts.publishedAt).toLocaleDateString()}
                </p>
              )}
              {posts?.publishedAt && (
                <p className="">{new Date(posts.publishedAt).toLocaleTimeString().slice(0, -3)}
                </p>
              )}
            </div>

            {/* Body */}
            {posts.body && posts.body.length > 0 && (
            <div className="prose max-w-none">
              <PortableText value={posts.body} />
            </div>
          )}
          </div>
      </div>
    </div>
  );
}