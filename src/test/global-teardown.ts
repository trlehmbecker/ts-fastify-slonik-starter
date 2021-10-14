import isCI from "is-ci"
import dockerCompose from "docker-compose"

module.exports = async () => {
  if (isCI) {
    dockerCompose.down()
  }

  // Leave DB up if not in CI
}
