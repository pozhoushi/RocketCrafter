const isType = (target, str) => {
  let rst = Object.prototype.toString.call(target)
  return rst.substring(8, rst.length - 1).toLowerCase() === str
}

function Prom(f) {
  this.state = 'pending'
  this.result = null
  this.callbacks = []
  this.once = 0
  let onFulfilled = newValue => tran(this, 'fulfilled', newValue)
  let onRejected = newReason => tran(this, 'rejected', newReason)
  let resolve = value => !this.once++ && resolvePromise(this, value, onFulfilled, onRejected)
  let reject = reason => !this.once++ && onRejected(reason) 
  try { f(resolve, reject) } catch (e) { reject(e) }
}

const tran = (prom, newState, newResult) => {
  if (newState !== 'pending') return
  prom.state = newState
  prom.result = newResult
  setTimeout(_ => handleCallbacks(prom), 0)
}

const handleCallbacks = prom => {
  while (prom.callbacks.length) handleCallback(prom.callbacks.shift(), prom.state, prom.result)
}

Prom.prototype.then = function (onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    
  })
}

const handleCallback = prom => {

}

// function Prom(f) {
//   this.state = 'pending'
//   this.result = null
//   this.callbacks = []
//   this.once = 0
//   let onFulfilled = value => transition(this, 'fulfilled', value)
//   let onRejected = reason => transition(this, 'rejected', reason)
//   let resolve = value => !this.once++ && resolvePromise(this, value, onFulfilled, onRejected)
//   let reject = reason => !this.once++ && onRejected(reason)
//   try { f(resolve, reject) } catch (e) { reject(e) }
// }

// const transition = (promise, state, result) => {
//   if (promise.state !== 'pending') return
//   Object.assign(promise, {state, result})
//   setTimeout(() => handleCallbacks(promise), 0)
// }

// Prom.prototype.then = function(onFulfilled, onRejected) {
//   return new Prom((prom2resolve, prom2reject) => {
//     let callback = { onFulfilled, onRejected, prom2resolve, prom2reject }
//     this.state === 'pending' ?
//       this.callbacks.push(callback) :
//       setTimeout(() => handleCallback(callback, this.state, this.result), 0)
//   })
// }

// const handleCallback = (callback, state, result) => {
//   let { onFulfilled, onRejected, prom2resolve, prom2reject } = callback
//   try {
//     state === 'fulfilled' && ( isType(onFulfilled, 'function') ? prom2resolve(onFulfilled(result)) : prom2resolve(result) )
//     state === 'rejected' && ( isType(onRejected, 'function') ? prom2resolve(onRejected(result)) : prom2reject(result) )
//   } catch (error) { prom2reject(error) }
// }

// const handleCallbacks = prom => {
//   while (prom.callbacks.length) handleCallback(prom.callbacks.shift(), prom.state, prom.result)
// }

// const resolvePromise = (promise, result, resolve, reject) => {
//   if (result === promise) return reject(new TypeError('Can not fulfill promise with itself'))
//   // if (result instanceof Promise) return result.then(resolve, reject)
//   if (
//     ( isType(result, 'function') || isType(result, 'object') ) &&
//     'then' in result
//   ) {
//     try {
//       let then = result.then
//       if (isType(then, 'function')) return new Prom(then.bind(result)).then(resolve, reject)
//     } catch (error) {
//       return reject(error)
//     }
//   }
//   resolve(result)
// }

/* npm run test */
Prom.defer = Prom.deferred = function () {
  let dfd = {}
  dfd.promise = new Prom((resolve,reject) => Object.assign(dfd, { resolve, reject }))
  return dfd;
}

module.exports = Prom