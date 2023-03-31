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
  },
  saveObj(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  },
  getObj(key){
    return JSON.parse(localStorage.getItem(key))
  }
}
