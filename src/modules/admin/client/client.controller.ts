import { Request, Response } from "express"
import { ClientLeadInput, ClientLeadSchema } from "./client.schema"
import {
  createClientService,
  deleteClientService,
  getClientProfilePageService,
  getClientsService,
  successPaymentService,
  updateClientService,
} from "./client.service"
import { sendSuccess } from "@/utils/response"
import { getClientFiltersUtil } from "./client.utils"

export const getClientsController = async (req: Request, res: Response) => {
  const user_id = req.user?.id || ""
   
    
  const clients = await getClientsService(user_id , getClientFiltersUtil(req.query))
  console.log("🚀 ~ getClientsController ~ clients:", clients)
  return sendSuccess(res, "Clients fetched successfully", clients)
}

export const createClientController = async (req: Request, res: Response) => {
  const user_id = req.user?.id || ""
  console.log("User ID:", user_id)
  const payload = await ClientLeadSchema.parseAsync(req.body)
  const client = await createClientService(user_id, payload)
  return sendSuccess(res, "Client created successfully", client)
}

export const updateClientController = async (req: Request, res: Response) => {
  const { id } = req.params
  const payload = await ClientLeadSchema.parseAsync(req.body)
  const client = await updateClientService(id as string, payload)
  return sendSuccess(res, "Client updated successfully", client)
}

export const deleteClientController = async (req: Request, res: Response) => {
  const { id } = req.params
  const client = await deleteClientService(id as string)
  return sendSuccess(res, "Client deleted successfully", client)
}

export const successPaymentController = async (req: Request, res: Response) => {
  const { id } = req.params
  const client = await successPaymentService(id as string)
  return sendSuccess(res, "Client payment successful", client)
}

export const getClientProfilePageController = async (req: Request, res: Response) => {
  const { id } = req.params
  const client = await getClientProfilePageService(id as string)
  return sendSuccess(res, "Client Profile Details Fetched Successfully.", client)
}
