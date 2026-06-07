"use server";

import { createBlogSchema } from "@/schemas/blog";
import { z } from "zod/v3";
import { revalidatePath } from "next/cache";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchAuthMutation, getToken } from "@/lib/auth-server";

export async function createPostAction(
  values: z.infer<typeof createBlogSchema>
): Promise<void> {
  const result = createBlogSchema.safeParse(values);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { title, content } = result.data;

  // Guard: ensure user is authenticated before mutating
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  // fetchAuthMutation picks up the token automatically — no need to pass it
  await fetchAuthMutation(api.posts.createPost, { title, content });

  revalidatePath("/");
  redirect("/blog");
}
