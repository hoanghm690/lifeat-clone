import { createStore } from 'vuex'
import space from './space'
import createPersistedState from 'vuex-plugin-persistedstate'

const store = createStore({
  modules: {
    space
  },
  plugins: [
    createPersistedState({
      paths: ['space']
    })
  ]
})

export default store
