import Link from "next/link";
import { defineQuery, PortableText, PortableTextBlock } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
// import { client } from "@/sanity/client";
import ShortForm from "@/components/shortform";

const POSTS_QUERY_LONG = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && format match "long-format"
]{_id, title, slug, publishedAt, body}|order(date desc)`);

interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    body: PortableTextBlock;
}

export default async function Home() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY_LONG });

  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-5 p-5">

      {/* Message box */}
      <div className="my-8 p-2 rounded-lg border-1 border-white bg-t-white">
        <div className="flex flex-row font-handjet text-xl justify-between ">
          <p className="text-xl w-auto">Latest message</p>
          <Link href="#" className="hover:underline"><p className="w-auto">See all messages</p></Link>
        </div>
        <div className="my-2.5">
          <ShortForm />
        </div>
      </div>

      {/* Divider */}
      {/* <div className="w-[90vw] h-[2px] bg-white" /> */}

      <h1 className="text-5xl font-semibold place-self-start font-handjet text-primary-2">Posts</h1>

      <div className="flex flex-col gap-12 w-[90vw]">
        {posts.map((post: Post) => (
          <div className="bg-white p-4 rounded-lg" key={post._id}>

            <Link
              className="hover:underline"
              href={`/posts/${post?.slug?.current}`}
            >
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              {post?.publishedAt && (
                <p className="text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}
                </p>
              )}
            </Link>
            {post.body && (
            <div className="prose max-w-none">
              <PortableText value={post.body} />
            </div>
          )}
          </div>
        ))}
      </div>
    </main>
  );
}