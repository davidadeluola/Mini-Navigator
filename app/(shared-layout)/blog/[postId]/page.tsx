import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";

const FALLBACK =
  "https://images.unsplash.com/photo-1780328766286-23e6cb082cb9?w=800&auto=format&fit=crop&q=60";

interface PostIdProps {
  params: Promise<{ postId: Id<"posts"> }>;
}

const PostId = async ({ params }: PostIdProps) => {
  const { postId } = await params;

  const postData = await fetchQuery(api.posts.getPostById, { postId });

  if (!postData) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center space-y-4">
        <p className="text-muted-foreground text-lg">Post not found.</p>
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in-40 duration-300">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
          <ArrowLeft /> Back to Blog
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
        <Image
          src={
            postData.imageUrl && postData.imageUrl.length > 0
              ? postData.imageUrl
              : FALLBACK
          }
          alt={postData.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      {/* Meta */}
      <div className="mt-16 space-y-3 ">
        <h1 className="text-4xl font-bold tracking-tight leading-tight mt-8">
          {postData.title}
        </h1>
        <p className="text-sm text-muted-foreground">By {postData.authorId}</p>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {new Date(postData._creationTime).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Divider */}
    

      <div className="mt-8 space-y-6">
        <Separator className="my-8 " />
        <p className="text-base text-foreground/90 font-mono leading-8 whitespace-pre-wrap">
          {postData.content}
        </p>

         <Separator className="my-8 " />
      </div>
    </div>
  );
};

export default PostId;
