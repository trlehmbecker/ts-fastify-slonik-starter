import { SlonikMigrator } from "@slonik/migrator"
import { createPool } from "slonik"
import loadConfig from "./config"

const run = async () => {
  const config = await loadConfig()
  const slonik = createPool(config.databaseUrl)
  const migrator = new SlonikMigrator({
    migrationsPath: config.paths.migrations,
    migrationTableName: "migration",
    slonik,
    logger: console,
  })

  migrator.runAsCLI()
}

run()
