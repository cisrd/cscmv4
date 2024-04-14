import { z } from "zod";

export const treeviewSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(100),
});
