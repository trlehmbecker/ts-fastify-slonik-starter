require("ts-node/register")
import path from "path"
import dockerCompose from "docker-compose"
import isPortReachable from "is-port-reachable"
import npm from "npm"
import util from "util"

module.exports = async () => {
  console.time("global-setup")

  const isDBReachable = await isPortReachable(54310, { host: "127.0.0.1" })
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

    // Seed database
    const npmLoadAsPromise = util.promisify(npm.load)
    await npmLoadAsPromise()
    const npmCommandAsPromise = util.promisify(npm.commands["run-script"])
    await npmCommandAsPromise(["cross-env NODE_ENV=test migrate"])
  }

  console.timeEnd("global-setup")
}
