workflow "On push" {
  on = "push"
  resolves = ["GitHub Action for Zeit"]
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "install"
}

action "npm test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["npm install"]
  runs = "test"
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@0dbb077f64d0ec1068a644d25c71b1db66148a24"
  needs = ["npm test"]
  args = "tag"
}

action "GitHub Action for Zeit" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filters for GitHub Actions"]
  secrets = ["ZEIT_TOKEN"]
  args = "--target production"
}
