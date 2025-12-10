import z from "zod"

export const businessFormSchema = z.object({
 company: z.string().min(1, "Company name is required"),
  start_year: z.string().min(1, "Start year is required"),
  street_address: z.string().min(1, "Street address is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  vat_id: z.string().min(1, "VAT ID is required"),
  contact_name: z.string().min(1, "Contact name is required"),
  email: z.string().email("Invalid email"),
  contact_number: z.string().min(1, "Contact number is required"),
  whatsapp_number: z.string().optional(),
  website: z.string().min(1).url("Invalid URL"),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  google_business_profile_link: z.string().optional(),
})

export type BusinessFormData = z.infer<typeof businessFormSchema>;

