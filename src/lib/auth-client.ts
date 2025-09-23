import { clientEnv } from "@/env/client";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BETTER_AUTH_URL,
});
