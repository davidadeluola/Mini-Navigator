import { NextResponse } from "next/server";
import { z } from "zod/v3";

// export async function GET(request: Request) {
//   console.log("hello from the server");
//   return NextResponse.json({
//     message: `Hello from the server! as no ${request.url} has been requested`,
//   });
/**
 * Handles POST requests for creating a blog post and returns a JSON success message.
 *
 * @param request - The incoming HTTP request
 * @returns A JSON response containing a `message` string confirming the post was created
 */

export async function POST(request: Request) {
  console.log("hello from the server");

  return NextResponse.json({ message: "Post created successfully" });
}
