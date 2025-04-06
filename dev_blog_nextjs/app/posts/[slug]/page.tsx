import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const POST_QUERY = defineQuery(`*[
    _type == "post" &&
    slug.current == $slug
    ][0]{
  ...,
  "date": coalesce(date, now())}`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

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
    date,
    image,
    body,
    postType,
  } = post;
  const postImageUrl = image
    ? urlFor(image)?.width(550).height(310).url()
    : null;
  const postDate = new Date(date).toDateString();
  const postTime = new Date(date).toLocaleTimeString();

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/">← Back to desktop</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        <Image
          src={postImageUrl || "https://placehold.co/550x310/png"}
          alt={title || "Post"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="310"
          width="550"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {postType ? (
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
              </div>
            ) : null}
            {title ? (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">
                {title}
              </h1>
            ) : null}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">Date</dd>
              <div>
                {postDate && <dt>{postDate}</dt>}
                {postTime && <dt>{postTime}</dt>}
              </div>
            </dl>
          </div>
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