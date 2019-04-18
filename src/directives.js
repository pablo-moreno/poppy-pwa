function delay(fn, time) {
  let timeoutID = null
  return () => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      fn()
    }, time)
  }
}
export const delayInput = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    el.oninput = delay(binding.value, 1000)
  }
}
