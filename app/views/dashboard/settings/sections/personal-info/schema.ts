import { z } from "zod";

export const Schema = z.object({
  name: z.string().nonempty(),
  currency: z.string().nonempty(),
});

export type SchemaType = z.infer<typeof Schema>;
