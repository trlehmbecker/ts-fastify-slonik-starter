import path from "path"
import dockerCompose from "docker-compose"
import isPortReachable from "is-port-reachable"
import { execSync } from "child_process"

module.exports = async () => {
  console.time("global-setup")

  const isDBReachable = await isPortReachable(5438, { host: "127.0.0.1" })
  if (!isDBReachable) {
    // Start Postgres with Docker-Compose
    await dockerCompose.upAll({
      cwd: path.dirname(path.basename(__dirname)),
      log: true,
    })

    // Wait until postgres is ready and available
    await dockerCompose.exec("postgres", ["sh", "-c", "until pg_isready ; do sleep 1; done"], {
      cwd: path.join(__dirname),
    })
  }

  // setup, migrate, seed test database
  execSync("npx cross-env NODE_ENV=test npm run db:up test", { stdio: "inherit" })
  execSync("npx cross-env NODE_ENV=test npm run db:migrate up", { stdio: "inherit" })

  console.timeEnd("global-setup")
}
