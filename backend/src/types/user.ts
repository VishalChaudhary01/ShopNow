import { z } from "zod";

export const signinInput = z.object({
     email: z.string().email().trim(),
     password: z.string(),
});

export const signupInput = z.object({
     name: z.string().min(1).max(25),
     email: z.string().email().min(1).max(25).trim(),
     password: z.string().min(4).max(25),
})

export type SigninType = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>
