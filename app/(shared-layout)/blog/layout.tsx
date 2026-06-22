import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read all my latest posts, thoughts, and technical writing.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
