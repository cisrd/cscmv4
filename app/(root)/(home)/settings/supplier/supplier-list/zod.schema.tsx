import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string().optional(),
  status: z.boolean().optional(),
  statusIsCashPurchase: z.boolean().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  code: z.string().optional(),
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  address: z.string().min(5).max(255),
  comment: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email().min(3).optional(),
});
