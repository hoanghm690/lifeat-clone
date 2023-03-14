const storage = {
  setData({ key, value }) {
    return localStorage.setItem(key, value)
  },

  getData({ key }) {
    return localStorage.getItem(key)
  }
}

export default storage
