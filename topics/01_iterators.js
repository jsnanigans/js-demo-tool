// const list = [1,3,5,7]

// @Symbols.iterator

// const it = list[Symbol.iterator]()
// pattern: { value: any, done: boolean }
// pattern type: { value?: any, done: boolean }
// the next method returns the next value in the list


const myIterator = {
  values: [1,3,5,7],
  next: function() {
    return {
      done: this.values.length === 0,
      value: this.values.pop()
    }
  },
  return: function() {
    console.log('return method')
    this.values = []
    return { value: undefined, done: true }
  },
  throw: function(error) {
    console.log('throw method')
    return { value: undefined, done: true }
  },
  [Symbol.iterator]: function() {
    return this
  }
}

for (let value of myIterator) {
  console.log(value)
  if (value === 5) {
    myIterator.throw(new Error('Error'))
  }
}
