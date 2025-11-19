import { supabaseAdmin } from "@/config/db";
import { LoginInput } from "./auth.schema";

export const loginService = async ({ email, password }: LoginInput) => {
  console.log("In loginService");

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  console.log("data is ", data);

  if (error) {
    throw new Error(error.message);
  }

  const { session, user } = data;

  if (!session || !user) {
    throw new Error("Login failed: Invalid session data from Supabase.");
  }

  const userRole = user.app_metadata.role || "client";

  const name = user.user_metadata?.name || user.email?.split("@")[0] || "User";

  console.log("userRole is ", userRole);
  console.log("name is ", name);

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

export const getLoggedInService = async (userId: string) => {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(userId);

  if (error || !data.user) {
    throw new Error("User not found or session invalid.");
  }

  const user = data.user;
  const userRole = user.app_metadata.role || "client";
  const name = user.user_metadata?.name || user.email?.split("@")[0] || "User";

  return {
    id: user.id,
    email: user.email,
    role: userRole,
    name: name,
  };
};
