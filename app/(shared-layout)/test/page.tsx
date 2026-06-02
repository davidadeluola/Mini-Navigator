"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <main className="flex min-h-screen  items-center justify-between p-12">
      {tasks?.map(({ _id, text }) => <div key=
      

      {_id}>{text}</div>)}
    </main>
  );
}