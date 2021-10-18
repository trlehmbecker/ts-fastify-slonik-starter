import isCI from "is-ci"
import dockerCompose from "docker-compose"
import { execSync } from "child_process"

module.exports = async () => {
  if (isCI) {
    dockerCompose.down()
  }

  // Leave DB up if not in CI

  // Drop test database
  execSync("npx cross-env NODE_ENV=test npm run db:down test", { stdio: "inherit" })
}
