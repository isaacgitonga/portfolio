import type {EnvType} from "@/types";

export function getEnv(key: keyof EnvType) {
  const value = import.meta.env[key]

  if (!value) {
    throw new Error(`CONFIG_ERROR: Missing environment variable: ${key}`)
  }

  return value
}

export const env: EnvType = {
  NODE_ENV: getEnv('NODE_ENV'),
  RESEND_API_KEY: getEnv('RESEND_API_KEY'),
}