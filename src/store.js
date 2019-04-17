import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'chat',
  storage: localStorage,

  // Persistance reducer
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
      state.chats = chats.map(chat => ({
        id: chat._id,
        name: chat.name,
        messages: []
      }))
    },
    addMessage(state, msg) {
      const { message, room } = msg
      const [chat] = state.chats.filter(c => c.id === room)
      chat.messages.push(message)

      state.chats = [
        chat,
        ...state.chats.filter(c => c.id !== room),
      ]
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
    },
    addMessage({ commit }, message) {
      commit('addMessage', message)
    }
  },
  plugins: [
    vuexPersist.plugin
  ]
})
