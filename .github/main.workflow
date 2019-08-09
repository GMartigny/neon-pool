workflow "On push" {
  on = "push"
  resolves = ["Deploy to ZEIT"]
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "npm test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm install"]
  args = "test"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@0dbb077f64d0ec1068a644d25c71b1db66148a24"
  needs = ["npm test"]
  args = "tag"
}

action "Deploy to ZEIT" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters for GitHub Actions"]
  secrets = ["ZEIT_TOKEN"]
  args = "--target production --name neon-pool"
}
