import { db } from "@/config/db"
import { AppError } from "@/utils/appError"
import { ClientLeadInput } from "./client.type"
import bcrypt from "bcryptjs"
import { sendWelcomeEmail, welcomeEmailWithPaymentLink } from "./client.utils"

export const getClientsService = async (user_id: string) => {
  const { data: clients, error } = await db.from("client_leads").select("*")
  if (error) {
    throw new AppError(`Failed to fetch client leads: ${error.message}`, 500)
  }
  return clients ?? []
}

export const createClientService = async (user_id: string, data: ClientLeadInput) => {
  const payload = {
    ...data,
    user_id: user_id,
  }
  const { data: client, error } = await db.from("client_leads").insert(payload).select().single()
  if (error) throw new AppError(`Failed to create client lead: ${error.message}`, 500)
  // Send Welcome and Payment link to client
  await welcomeEmailWithPaymentLink(client?.email ?? "", client?.id ?? "")
  return client ?? null
}

export const updateClientService = async (id: string, data: ClientLeadInput) => {
  const payload = {
    ...data,
  }
  const { data: client, error } = await db
    .from("client_leads")
    .update(payload)
    .eq("id", id)
    .select()
  if (error) throw new AppError(`Failed to update client lead: ${error.message}`, 500)
  return client ?? null
}

export const deleteClientService = async (id: string) => {
  const { data: client, error } = await db.from("client_leads").delete().eq("id", id).select()
  if (error) throw new AppError(`Failed to delete client lead: ${error.message}`, 500)
  return client ?? null
}

export const successPaymentService = async (id: string) => {
  const { data: client, error } = await db
    .from("client_leads")
    .update({ payment_status: "paid", status: "active" })
    .eq("id", id)
    .select("*")
    .single()

  console.log("id: ", id)
  console.log(client)
  console.log(error)

  if (!client) throw new AppError(`Client not found`, 404)

  // generate random password
  const password = "Password@123"
  const hashedPassword = await bcrypt.hash(password, 10)

  // create user payload
  const userPayload = {
    email: client.email,
    password: hashedPassword,
    first_name: client.name,
    role: "f5ea9ffc-4256-4085-befa-0624b6292ae3",
  }

  // create user
  // check if user already exists
  const { data: existingUser, error: existingUserError } = await db
    .from("users")
    .select("*")
    .eq("email", client?.email ?? "")
    .single()
  if (existingUserError)
    throw new AppError(`Failed to check user: ${existingUserError.message}`, 500)
  if (existingUser) throw new AppError(`Payment already processed`, 400)

  const { data: user, error: userError } = await db
    .from("users")
    .insert(userPayload)
    .select()
    .single()
  if (userError) throw new AppError(`Failed to create user: ${userError.message}`, 500)

  // send welcome email
  await sendWelcomeEmail(user?.email ?? "", password)

  return { user, client }
}

export const getClientProfilePageService = async (id: string) => {
  console.log("🚀 ~ getClientProfilePageService ~ id:", id)
  if (!id) throw new Error("Client ID is required")

  const { data: ads_budget, error: adsBudgetError } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("client_id", id)
    .maybeSingle()
  console.log("🚀 ~ getClientProfilePageService ~ adsBudgetError:", adsBudgetError)
  console.log("🚀 ~ getClientProfilePageService ~ ads_budget:", ads_budget)

  const { data: branding_info, error: brandingInfoError } = await db
    .from("branding_assets")
    .select("*")
    .eq("user_id", id)
    .maybeSingle()
  console.log("🚀 ~ getClientProfilePageService ~ brandingInfoError:", brandingInfoError)
  console.log("🚀 ~ getClientProfilePageService ~ branding_info:", branding_info)

  const { data: business_info, error: businessInfoError } = await db
    .from("business_information")
    .select("*")
    .eq("user_id", id)
    .maybeSingle()
  console.log("🚀 ~ getClientProfilePageService ~ businessInfoError:", businessInfoError)
  console.log("🚀 ~ getClientProfilePageService ~ business_info:", business_info)

  const { data: toolsAccessData, error: toolsAccessError } = await db
    .from("tools_access")
    .select("*")
    .eq("user_id", id)
    .maybeSingle() // safer than single()
  console.log("🚀 ~ getClientProfilePageService ~ toolsAccessError:", toolsAccessError)
  console.log("🚀 ~ getClientProfilePageService ~ toolsAccessData:", toolsAccessData)

  const { data, error } = await db.from("website_setup").select("*").eq("user_id", id).maybeSingle()
  console.log("🚀 ~ getClientProfilePageService ~ error:", error)
  console.log("🚀 ~ getClientProfilePageService ~ data:", data)

  return {
    ads_budget: ads_budget,
    branding_info,
    business_info,
    tools_access: toolsAccessData,
    website_setup: data,
  }
}
