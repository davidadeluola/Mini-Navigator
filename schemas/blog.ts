import { z } from "zod/v3";

export const createBlogSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(5000),
  image: z.instanceof(File).optional(),
});

export type CreateBlogSchema = z.infer<typeof createBlogSchema>;
