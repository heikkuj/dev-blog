// import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
// import imageUrlBuilder from "@sanity/image-url";
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiCaretLeft } from "react-icons/bi";

const POST_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == $slug
    ][0]{
  ...,
  "date": coalesce(date, now())}`);

// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: await params,
  });
  if (!post) {
    notFound();
  }
  const {
    title,
    publishedAt,
    body,
  } = post;
  const postDate = new Date(publishedAt).toDateString();

  return (
    <main className="p-5 bg-primary-1">

      <div className="flex flex-row font-handjet text-xl items-center mb-5">
        <BiCaretLeft />
        <Link href="/" className="hover:underline\">Back to desktop</Link>
      </div>

      {/* Title */}
      <div>
        <div className="flex justify-self-end">
          {title ? (
            <h1 className="text-4xl font-semibold font-handjet mb-2">
              {title}
            </h1>
          ) : null}
      </div>

      <div className="my-5 p-2 rounded-lg border-1 border-white bg-t-white">
        {/* Timestamp */}
        <div className="flex text-lg font-handjet justify-self-end">
            {postDate && <div>{postDate}</div>}
        </div>

        {/* Divider */}
        <div className="m-2 h-[1px] bg-primary-2" />

        {/* Body */}
        
        {body && body.length > 0 && (
        <div className="prose max-w-none">
          <PortableText value={body} />
        </div>
        )}
      </div>
    </div>

    </main>
  );
}