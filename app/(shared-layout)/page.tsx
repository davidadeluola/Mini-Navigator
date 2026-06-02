// import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-1 flex-col items-center justify-center bg-background px-4 text-foreground">
      <h1 className="text-center text-sm font-semibold tracking-tight">
        This is the <span className="font-bold text-blue-500 cursor-pointer">index</span> page.
      </h1>
    </main>
  );
}
