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
      if (typeof element[1] === 'object') return this.saveObj(...element)
      this.set(...element)
    })
  },
  saveObj(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  getObj(key) {
    const data = localStorage.getItem(key)
    if (data) return JSON.parse(localStorage.getItem(key))
    return {}
  }
}
