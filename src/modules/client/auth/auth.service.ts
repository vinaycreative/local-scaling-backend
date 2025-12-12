import { db, supabaseAdmin } from "@/config/db"
import { signJwt } from "@/config/jwt"
import { ExchangeSessionInput, LoginInput, SignUpInput } from "./auth.schema"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const loginService = async ({ email, password }: LoginInput) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const normalizedEmail = email.toLowerCase().trim()

    const { data: user, error: userError } = await db
      .from("users")
      .select(
        `
          *, role:roles(id,name,permissions)
        `
      )
      .eq("email", normalizedEmail)
      .single()

    if (userError) {
      console.error("Supabase error:", userError)
      // Don't reveal if user exists or not for security
      throw new Error("Invalid credentials")
    }

    if (!user) {
      throw new Error("Invalid credentials")
    }

    console.log(`User found: ${user.id}, has password: ${!!user.password}`)

    // Verify password
    if (!user.password) {
      console.error("User has no password hash")
      throw new Error("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log("Password mismatch for user:", user.id)
      throw new Error("Invalid credentials")
    }

    console.log("Password validated successfully for user:", user.id)

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured")
    }

    const tokenPayload = {
      id: user.id,
      role: user?.role?.name,
      permissions: user?.role?.permissions,
    }

    const token = jwt.sign(
      {
        ...tokenPayload,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    )

    const { password: _, ...userWithoutPassword } = user

    const response = {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      role: user.role?.name,
      permissions: user.role?.permissions,
    }

    console.log(`Login successful for user: ${user.id}`)
    return response
  } catch (error: any) {
    console.error("Login service error:", error.message)

    // Re-throw with appropriate message
    if (error.message.includes("credentials") || error.message.includes("Invalid")) {
      throw new Error("Invalid credentials")
    }

    if (error.message.includes("JWT_SECRET")) {
      throw new Error("Server configuration error")
    }

    throw new Error(error.message || "Login failed")
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

export const exchangeSessionService = async ({ accessToken }: ExchangeSessionInput) => {
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(accessToken)

  if (error || !user) {
    throw new Error("Invalid or expired external session token.")
  }

  const customPayload = {
    sub: user.id,
    email: user.email || "",
    role: (user.user_metadata?.role as string) || "Client",
    name: (user.user_metadata?.full_name as string) || "User",
  }

  const customJwt = await signJwt(customPayload)

  return {
    token: customJwt,
    user: {
      id: user.id,
      email: user.email,
      role: customPayload.role,
      name: customPayload.name,
    },
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
