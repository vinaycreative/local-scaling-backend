import { supabaseAdmin } from "@/config/db";
import { signJwt } from "@/config/jwt";
import { ExchangeSessionInput, LoginInput, SignUpInput } from "./auth.schema";

export const loginService = async ({ email, password }: LoginInput) => {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const { session, user } = data;
  if (!session || !user) throw new Error("Login failed: Invalid session data.");

  const userRole = user.app_metadata.role || "client";
  const name = user.user_metadata?.name || user.email?.split("@")[0] || "User";

  return {
    token: session.access_token,
    user: {
      id: user.id,
      email: user.email,
      role: userRole,
      name: name,
    },
  };
};

export const signUpService = async ({ email, password }: SignUpInput) => {
  const { data, error } = await supabaseAdmin.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return {
    user: {
      id: data.user?.id,
      email: data.user?.email,
    },
    session: data.session,
  };
};

export const exchangeSessionService = async ({
  accessToken,
}: ExchangeSessionInput) => {
  const {
    data: { user },
    error,
  } = await supabaseAdmin.auth.getUser(accessToken);

  if (error || !user) {
    throw new Error("Invalid or expired external session token.");
  }

  const customPayload = {
    sub: user.id,
    email: user.email || "",
    role: (user.user_metadata?.role as string) || "Client",
    name: (user.user_metadata?.full_name as string) || "User",
  };

  const customJwt = await signJwt(customPayload);

  return {
    token: customJwt,
    user: {
      id: user.id,
      email: user.email,
      role: customPayload.role,
      name: customPayload.name,
    },
  };
};

export const logoutService = async (token?: string) => {
  if (token) {
    const { error } = await supabaseAdmin.auth.admin.signOut(token);
    if (error) {
      console.error("Supabase logout error:", error.message);
    }
  }
  return true;
};
