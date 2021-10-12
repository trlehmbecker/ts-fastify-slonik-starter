import { basename, resolve, dirname } from "path"

interface AppConfig {
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

  if (mode === "development") {
    const { config } = await import("dotenv")
    config()
  }

  const appConfig: AppConfig = {
    mode,
    httpPort: process.env.HTTP_PORT || 0,
    databaseUrl: process.env.DATABASE_URL || "",
    paths: {
      controllers: resolve(__dirname, "controllers"),
      migrations: resolve(dirname(basename(__dirname)), "migrations"),
    },
  }

  return appConfig
}

export default loadConfig
