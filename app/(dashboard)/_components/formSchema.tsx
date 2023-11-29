import * as z from "zod";

export const formSchma = z.object({
  prompt: z.string().min(1, { message: "enter alteast 1 character" }),
});

