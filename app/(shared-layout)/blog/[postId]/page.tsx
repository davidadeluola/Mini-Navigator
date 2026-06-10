import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PostId = () => {
  return (
    <>
      <div className="max-w-4xl py-8 px-4 mx-auto animate-in fade-in-40 duration-200 relative">
        <Link href="/blog" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft /> Back to Blog
        </Link>
      </div>
    </>
  );
};

export default PostId;
