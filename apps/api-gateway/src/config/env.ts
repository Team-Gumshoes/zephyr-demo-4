import {z} from 'zod'

const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().min(1000),
  TYPESCRIPT_AGENTS_URL: z.string(),
  PYTHON_AGENTS_URL: z.string(),

  CORS_ORIGIN: z.string(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]),
  
  SUPABASE_URL: z.string().url(),
  SUPABASE_KEY: z.string().min(1),
})

const parsedResults = environmentSchema.safeParse(
  process.env 
)

if (!parsedResults.success) {
  console.error("Environment variable validation failed:", parsedResults.error.format());
  throw new Error("Invalid environment variables");
}

export const config = parsedResults.data