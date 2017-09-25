export function isPromise(val) {
  return Promise.resolve(val) == val;
}