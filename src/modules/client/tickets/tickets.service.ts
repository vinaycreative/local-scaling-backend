import { db } from "@/config/db"
import { CreateTicketPayload, TicketFilters } from "./tickets.types"
export const getTicketsService = async (userId: string, filters: TicketFilters) => {
  console.log("🚀 ~ getTicketsService ~ filters:", filters)
  const page = filters.page ?? 1
  const perPage = filters.perPage ?? 10

  const from = (page - 1) * perPage
  const to = from + perPage - 1

  let query = db
    .from("tickets")
    .select(
      `
    *,
    created_by (
      first_name,
      last_name
    ),
    assigned_to (
      first_name,
      last_name
    )
  `,
      { count: "exact" }
    )
    .eq("created_by", userId)

  // TEXT SEARCH
  if (filters.title?.trim()) {
    query = query.ilike("title", `%${filters.title.trim()}%`)
  }

  if (filters.subject) {
    query = query.ilike("subject", `%${filters.subject}%`)
  }

  // MULTI-SELECT FILTERS
  if (filters.category?.length) {
    query = query.in("category", filters.category)
  }

  if (filters.priority) {
    Array.isArray(filters.priority)
      ? (query = query.in("priority", filters.priority))
      : (query = query.eq("priority", filters.priority))
  }

  if (filters.status) {
    Array.isArray(filters.status)
      ? (query = query.in("status", filters.status))
      : (query = query.eq("status", filters.status))
  }

  // DATE FILTER
  if (filters.created_at) {
    query = query.gte("created_at", new Date(Number(filters.created_at)).toISOString())
  }

  // ORDERING (should come after filters but before pagination)
  query = query.order("created_at", { ascending: false })

  // PAGINATION
  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    throw error
  }

  return {
    data,
    page,
    perPage,
    total: count ?? 0,
    totalPages: count ? Math.ceil(count / perPage) : 0,
  }
}

export const createTicketsService = async (userId: string, payload: any) => {
  const { data, error } = await db.from("tickets").insert(payload)
  console.log("🚀 ~ createTicketsService ~ error:", error)

  return data
}
