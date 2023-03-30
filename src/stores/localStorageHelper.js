export default {
  get(key) {
    return localStorage.getItem(key)
  },
  set(key, value) {
    localStorage.setItem(key, value)
  },
  get length() {
    return localStorage.length
  },
  saveAll(arr) {
    arr.forEach((element) => {
      this.set(...element)
    })
  }
}
