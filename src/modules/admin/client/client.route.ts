import { Router } from "express"
import {
  getClientsController,
  createClientController,
  updateClientController,
  deleteClientController,
} from "./client.controller"

const router = Router()

router.get("/", getClientsController)
router.post("/", createClientController)
router.put("/:id", updateClientController)
router.delete("/:id", deleteClientController)

export default router
