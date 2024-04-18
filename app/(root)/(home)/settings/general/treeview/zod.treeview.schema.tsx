import { min } from "lodash";
import { z } from "zod";

export const treeviewSchema = z.object({
  parentID: z
    .preprocess((a) => parseInt(a as string, 10), z.number())
    .nullable()
    .optional(),
  name: z
    .string()
    .min(2, { message: "Must be 2 or more characters long" })
    .max(100, { message: "Must be 100 or fewer characters long" }),
  code: z.string().min(3).max(3).nullable().optional(),
  companyName: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  poFooter: z.string().nullable().optional(),
  poEmailBody: z.string().nullable().optional(),
  poCcEmail: z.string().nullable().optional(),
  isActivated: z.boolean().optional(),
});
