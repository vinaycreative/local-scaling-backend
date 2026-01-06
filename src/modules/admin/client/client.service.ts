import { db } from "@/config/db"
import { AppError } from "@/utils/appError"
import { ClientLeadInput, GetClientsFilters } from "./client.type"
import bcrypt from "bcryptjs"
import { sendWelcomeEmail, welcomeEmailWithPaymentLink } from "./client.utils"

export const getClientsService = async (userId: string, filters?: GetClientsFilters) => {
  const page = filters?.page ?? 1
  const perPage = filters?.perPage ?? 10

  const from = (page - 1) * perPage
  const to = from + perPage - 1

  let query = db.from("client_leads").select("*", { count: "exact" })

  // -------- TEXT FILTERS (ILIKE) --------
  if (filters?.company_name) {
    query = query.ilike("company_name", `%${filters.company_name}%`)
  }

  if (filters?.name) {
    query = query.ilike("name", `%${filters.name}%`)
  }

  if (filters?.email) {
    query = query.ilike("email", `%${filters.email}%`)
  }

  if (filters?.vat_id) {
    query = query.ilike("vat_id", `%${filters.vat_id}%`)
  }

  if (filters?.address) {
    query = query.ilike("address", `%${filters.address}%`)
  }

  if (filters?.postal_code) {
    query = query.ilike("postal_code", `%${filters.postal_code}%`)
  }

  if (filters?.city) {
    query = query.ilike("city", `%${filters.city}%`)
  }

  if (filters?.state) {
    query = query.ilike("state", `%${filters.state}%`)
  }

  if (filters?.country) {
    query = query.ilike("country", `%${filters.country}%`)
  }

  // -------- EXACT MATCH FILTERS --------
  if (filters?.monthly_payment_excluding_taxes) {
    query = query.eq("monthly_payment_excluding_taxes", filters.monthly_payment_excluding_taxes)
  }

  if (filters?.payment_status) {
    query = query.eq("payment_status", filters.payment_status)
  }

  if (filters?.payment_link) {
    query = query.eq("payment_link", filters.payment_link)
  }

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  // -------- DATE FILTERS --------
  if (filters?.created_at) {
    query = query.gte("created_at", filters.created_at)
  }

  if (filters?.updated_at) {
    query = query.gte("updated_at", filters.updated_at)
  }

  // -------- PAGINATION --------
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw error
  }

  return {
    data: data ?? [],
    page,
    perPage,
    total: count ?? 0,
    totalPages: count ? Math.ceil(count / perPage) : 0,
  }
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
  const { data: clientData, error: clientError } = await db
    .from("users")
    .select(
      `
    *, role:roles(id,name,permissions)
  `
    )
    .eq("client_lead_id", id)
    .single()

  const userId = clientData?.id ?? ""

  const { data: ads_budget, error: adsBudgetError } = await db
    .from("ads_budget_location")
    .select("*")
    .eq("client_id", userId)
    .maybeSingle()

  const { data: branding_info, error: brandingInfoError } = await db
    .from("branding_assets")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle()

  const { data: business_info, error: businessInfoError } = await db
    .from("business_information")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle()

  const { data: toolsAccessData, error: toolsAccessError } = await db
    .from("tools_access")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle() // safer than single()

  const { data, error } = await db
    .from("website_setup")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle()

  return {
    user: clientData,
    business_info,
    branding_info,
    tools_access: toolsAccessData,
    website_setup: data,
    ads_budget: ads_budget,
  }
}
