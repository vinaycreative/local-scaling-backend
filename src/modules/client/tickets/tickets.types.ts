export type TicketFilters = {
  page?: number
  perPage?: number
  title?: string | null
  subject?: string | null
  category?: string[] | null
  priority?: string | null
  status?: string | null
  created_at?: string | null
}

export type CreateTicketPayload = {
  title?: string | null
  subject?: string | null
  category?: string[] | null
  priority?: string | null
  status?: string | null
}
