import { z } from "zod/v3";

export const signupSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().includes("@"),
    password: z.string().min(6).max(12),
});

export const loginSchema = z.object({
    email: z.string().email().includes("@"),
    password: z.string().min(6).max(12),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;