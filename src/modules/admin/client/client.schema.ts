import { z } from "zod"

export const ClientLeadSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  name: z.string().min(1, "Client name is required"),
  email: z.string().email("Invalid email"),
  vat_id: z.string().min(1, "VAT ID is required"),
  address: z.string().min(1, "Street address is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  monthly_payment_excluding_taxes: z.string().min(1, "Monthly payment is required"),
})

export type ClientLeadInput = z.infer<typeof ClientLeadSchema>
