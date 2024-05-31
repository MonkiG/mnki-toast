export default class PropError extends Error {
  constructor (prop) {
    super(`The toast property ${prop} must be defined either via constructor or HTML data-${prop} attribute`)
  }
}
