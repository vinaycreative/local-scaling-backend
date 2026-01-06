import z from "zod"

export const websiteSetupSchema = z.object({
  access_granted: z.boolean().default(false),
  domain_provider: z.string().min(1, { message: "Domain provider is required" }),
  business_clients_worked: z.array(z.string()).default([]),
  legal_links: z.array(z.string().url({ message: "Invalid URL in legal links" })).default([]),
  legalFiles: z.array(z.string()).default([]),
  seoLocations: z.array(z.string()).default([]),
})

export type WebsiteSetupPayload = z.infer<typeof websiteSetupSchema>
