// Mark this module as a Next.js Server Action file — all exports run server-side only
"use server";

import { createBlogSchema } from "@/schemas/blog";
import { z } from "zod/v3";
import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchAuthMutation, getToken } from "@/lib/auth-server";
import { Id } from "@/convex/_generated/dataModel";

/**
 * Server Action: createPostAction
 *
 * Validates the form data, optionally uploads an image to Convex storage,
 * then creates a new blog post via a Convex mutation.
 * Redirects to /blog on success.
 */
export async function createPostAction(
  values: z.infer<typeof createBlogSchema>
): Promise<void> {
  // Validate incoming form values against the schema on the server
  // (client-side validation can be bypassed, so this is the source of truth)
  const result = createBlogSchema.safeParse(values);
  if (!result.success) {
    throw new Error(result.error.message);
  }

  const { title, content, image, tag, imageCreditName, imageCreditUrl } = result.data;

  // Verify the user is authenticated before performing any mutations
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  // storageId is only set if the user attached an image
  // Typed as Id<"_storage"> to satisfy Convex's branded nominal type
  let storageId: Id<"_storage"> | undefined;

  if (image) {
    // Step 1: Request a one-time Convex upload URL
    // generateUploadUrl takes no extra args — the auth context is handled internally
    const uploadUrl = await fetchAuthMutation(api.posts.generateUploadUrl, {});

    // Step 2: POST the raw file directly to the Convex storage URL
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: image,
      headers: {
        // Tell Convex what MIME type to store (e.g. "image/png", "image/jpeg")
        "Content-Type": image.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image");
    }

    // Step 3: Extract the storageId returned by Convex after a successful upload
    // Cast to Id<"_storage"> — Convex returns a branded ID string
    const json = await uploadResponse.json();
    storageId = json.storageId as Id<"_storage">;
  }

  // Create the post in Convex — only include imageId if an image was uploaded
  await fetchAuthMutation(api.posts.createPost, {
    title,
    content,
    ...(tag && { tag }),
    ...(storageId && { imageId: storageId }),
    ...(imageCreditName && { imageCreditName }),
    ...(imageCreditUrl && { imageCreditUrl }),
  });

  // Bust the cache for the home page so the new post appears immediately
  revalidatePath("/");
  // Navigate the user to the 
  // 
  // updablog listing page after creation
  updateTag("blog");
  redirect("/blog");
}
