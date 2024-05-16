const fn1 = async (next) => {
  sleep(() => {
    console.log(111)
    next()
  })
}

const fn2 = async (next) => {
  sleep(() => {
    console.log(222)
    next()
  })
}

const fn3 = async (next) => {
  sleep(() => {
    console.log(333)
    next()
  })
}

const done = () => console.log("done")

const arr = [fn1, fn2, fn3]
let idx = 0

function next() {
  if (idx >= arr.length) {
    done()
    return
  }
  const fn = arr[idx++]
  fn(next)
}

next()

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
async function sleep(fn, ...args) {
  await timeout(3000)
  return fn(...args)
}
