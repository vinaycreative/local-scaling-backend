import { db, supabaseAdmin } from "@/config/db"
import { generateToken } from "@/config/jwt"
import { ExchangeSessionInput, LoginInput, SignUpInput } from "./auth.schema"
import bcrypt from "bcrypt"
import { AppError } from "@/utils/appError"

export const loginServiceWithEmailPassword = async ({ email, password }: LoginInput) => {
  const { data: user, error: userError } = await db
    .from("users")
    .select(
      `
      *, role:roles(id,name,permissions)
    `
    )
    .eq("email", email)
    .single()

  if (userError || !user?.password) {
    throw new AppError("Invalid email or password")
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password)
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password")
  }

  const userPayload = {
    id: user.id || "",
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    role: user?.role?.name || "",
    type: "internal",
  }
  const token = generateToken(userPayload, "30d")

  return {
    token: token,
    user: userPayload,
  }
}

export const signUpService = async ({ email, password }: SignUpInput) => {
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
  })

  if (error) throw new Error(error.message)

  return {
    user: {
      id: data.user?.id,
      email: data.user?.email,
    },
    session: data.session,
  }
}

export const getLoggedInUserService = async (user_id: string) => {
  const { data: user, error: userError } = await db
    .from("users")
    .select(
      `
    *, role:roles(id,name,permissions)
  `
    )
    .eq("id", user_id)
    .single()

  if (userError || !user?.password) {
    throw new AppError("Invalid email or password")
  }

  const userPayload = {
    id: user.id || "",
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    role: user?.role?.name || "",
    type: "internal",
  }
  return {
    user: userPayload,
  }
}

export const logoutService = async (token?: string) => {
  if (token) {
    const { error } = await supabaseAdmin.auth.admin.signOut(token)
    if (error) {
      console.error("Supabase logout error:", error.message)
    }
  }
  return true
}
