const space = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment(state) {
      state.count++
    }
  }
}

export default space
