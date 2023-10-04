import log from "../lib/log"

log(3)

function Person () {
  this.name = "Person Constructor"
  this.age = 33
}

const p = new Person()

// asd
log(p)
