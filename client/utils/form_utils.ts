import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  app: z.string().min(1),
  url: z.string().min(1),
});

// extract the type of the formSchema

export type FormSchema = z.infer<typeof formSchema>;
