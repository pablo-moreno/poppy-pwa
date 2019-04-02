import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'chat',
  storage: localStorage,
  reducer: state => ({
    auth: state.auth
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chats: [],
    auth: {
      user: undefined,
    }
  },
  mutations: {
    login(state, user) {
      state.auth.user = user
    },
    logout(state) {
      state.auth.user = undefined
    },
    setChats(state, chats) {
      state.chats = chats
    }
  },
  actions: {
    login({ commit }, user) {
      commit('login', user)
    },
    logout({ commit }) {
      commit('logout')
    },
    setChats({ commit }, chats) {
      commit('setChats', chats)
    }
  },
  plugins: [
    vuexPersist.plugin
  ]
})
