import { z } from "zod";

export const treeviewSchema = z.object({
  id: z.preprocess((a) => parseInt(a as string, 10), z.number()).optional().nullable(),
  parentID: z
    .preprocess((a) => parseInt(a as string, 10), z.number())
    .nullable().optional(),
  name: z.string().min(2, { message: "Must be 2 or more characters long" }).max(100,{ message: "Must be 100 or fewer characters long" }),
});
