import log from "../lib/log";

function Person() {
  this.name = "Person Constructor";
  this.age = 33;
}

const o = {
  name: "Wallace",
  bark: function() { return "Woof!"; },
}

const p = new Person();

log(o)
log(p)
