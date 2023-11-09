export default {
  mounted(el, binding) {
    console.log(el.innerHTML, binding)
    el.innerHTML = binding.value
  },
  name: 'change-content',
}
