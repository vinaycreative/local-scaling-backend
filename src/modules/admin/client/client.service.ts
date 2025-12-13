import { db } from "@/config/db"
import { AppError } from "@/utils/appError"
import { ClientLeadInput } from "./client.type"

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
  const { data: client, error } = await db.from("client_leads").insert(payload).select()
  if (error) throw new AppError(`Failed to create client lead: ${error.message}`, 500)
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
