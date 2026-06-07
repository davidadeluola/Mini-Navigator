import { NextResponse } from "next/server";
import { z } from "zod/v3";

// export async function GET(request: Request) {
//   console.log("hello from the server");
//   return NextResponse.json({
//     message: `Hello from the server! as no ${request.url} has been requested`,
//   });
// }

export async function POST(request: Request) {
  console.log("hello from the server");

  return NextResponse.json({ message: "Post created successfully" });
}
