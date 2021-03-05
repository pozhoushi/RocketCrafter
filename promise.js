let PENDING = 'pending'
let FULFILLED = 'fulfilled'
let REJECTED = 'rejected'

function Promise() {
  this.state = PENDING
  this.result = null
}

const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return
  promise.state = state
  promise.result = result
}

Promise.prototype.then = function() {
  console.log('then')
}

const eren = new Promise({name: 'eren'})
eren.then()