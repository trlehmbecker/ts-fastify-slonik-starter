import { basename, resolve, dirname } from "path"

export interface AppConfig {
  mode: string
  httpPort: string | number
  databaseUrl: string
  paths: {
    controllers: string
    migrations: string
  }
}

const loadConfig = async (): Promise<AppConfig> => {
  const mode: string = process.env.NODE_ENV || "production"

  if (mode === "development" || mode === "test") {
    const { config } = await import("dotenv")
    const envFile = mode === "test" ? "test.env" : ".env"
    config({ path: envFile })
  }

  const appConfig: AppConfig = {
    mode,
    httpPort: process.env.HTTP_PORT || 80,
    databaseUrl: process.env.DATABASE_URL || "",
    paths: {
      controllers: resolve(__dirname, "controllers"),
      migrations: resolve(dirname(basename(__dirname)), "migrations"),
    },
  }

  return appConfig
}

export default loadConfig
