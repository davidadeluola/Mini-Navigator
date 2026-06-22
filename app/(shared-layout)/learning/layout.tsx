import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Log",
  description: "A log of my daily learnings and technical explorations.",
};

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
