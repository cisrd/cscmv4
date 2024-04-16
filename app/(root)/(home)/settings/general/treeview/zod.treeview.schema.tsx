import { z } from "zod";

export const treeviewSchema = z.object({
  id: z.string().optional().nullable(),
  parentID: z
    .preprocess((a) => parseInt(a as string, 10), z.number())
    .nullable().optional(),
  name: z.string().min(2).max(100),
});
