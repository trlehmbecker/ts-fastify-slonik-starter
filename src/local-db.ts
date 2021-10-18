import { sql, createPool, DatabasePoolType } from "slonik"
import loadConfig from "./config"

async function getDbConnection(): Promise<DatabasePoolType> {
  const { db } = await loadConfig()
  const databaseUrl = `postgres://${db.username}:${db.password}@${db.host}:${db.port}`
  const slonik = createPool(databaseUrl)
  return slonik
}

async function up(targetDb: string) {
  const db = await getDbConnection()
  let createDbQuery

  switch (targetDb) {
    case "dev":
      createDbQuery = sql`create database dev`
      break
    case "test":
      createDbQuery = sql`create database test`
      break
    default:
      console.error(`Unknown target DB '${targetDb}'`)
      return
  }

  try {
    await db.query(createDbQuery)
  } catch (err: any) {
    if (err.code === "42P04") {
      return
    }
    console.error(err)
  }
}

async function down(targetDb: string) {
  const db = await getDbConnection()
  let dropDbQuery

  switch (targetDb) {
    case "dev":
      dropDbQuery = sql`drop database dev`
      break
    case "test":
      dropDbQuery = sql`drop database test`
      break
    default:
      console.error(`Unknown target DB '${targetDb}'`)
      return
  }

  try {
    await db.query(dropDbQuery)
  } catch (err: any) {
    if (err.code === "3D000") {
      return
    }

    console.error(err)
  }
}

const run = async () => {
  const args = process.argv.slice(2)
  const mode = args[0] || ""
  const targetDb = args[1] || ""
  if (!targetDb) {
    console.error("You must provide a target DB arg (dev | test)")
    return
  }

  if (mode === "up") {
    up(targetDb)
  } else if (mode === "down") {
    down(targetDb)
  }
}

run()
