import z from "zod"

export const adsBudgetSchema = z.object({
  budget: z.string().min(1, { message: "Budget is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  seo_locations: z.array(z.string()).min(1, { message: "At least one location is required" }),
  services_provided: z.array(z.string()).min(1, { message: "At least one service is required" }),
})

export type AdsBudgetForm = z.infer<typeof adsBudgetSchema>
