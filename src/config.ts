import { basename, resolve, dirname } from "path"

export interface AppConfig {
  mode: string
  httpPort: string | number
  databaseUrl: string
  db: {
    username: string
    password: string
    host: string
    port: number
    name?: string
  }
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

  const db = {
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    port: Number(process.env.DB_PORT) || 5432,
    name: "",
  }

  if (process.env.DB_NAME) {
    db.name = process.env.DB_NAME
  }

  const databaseUrl = `postgres://${db.username}:${db.password}@${db.host}:${db.port}${db.name ? "/" + db.name : ""}`

  const appConfig: AppConfig = {
    mode,
    httpPort: process.env.HTTP_PORT || 80,
    db,
    databaseUrl,
    paths: {
      controllers: resolve(__dirname, "controllers"),
      migrations: resolve(dirname(basename(__dirname)), "migrations"),
    },
  }

  return appConfig
}

export default loadConfig
