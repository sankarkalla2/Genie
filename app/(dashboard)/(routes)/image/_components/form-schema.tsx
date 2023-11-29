import * as z from "zod";

export const formSchma = z.object({
  prompt: z.string().min(1, { message: "enter alteast 1 character" }),
  amount: z.string().min(1, { message: "enter atleast on character" }),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 photo",
  },
  {
    value: "2",
    label: "1 photos",
  },
  {
    value: "3",
    label: "1 photos",
  },
  {
    value: "4",
    label: "1 photos",
  },
  {
    value: "5",
    label: "1 photos",
  },
];

export const resulutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];
