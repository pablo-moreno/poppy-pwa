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
    chats: {},
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
      chats.forEach(chat => {
        const { _id, name,  } = chat
        state.chats[chat._id] = {
          id: _id,
          name,
          messages: [],
        }
      })
    },
    addMessage(state, message) {
      const { room } = message
      // const { chats } = state
      state.chats[room].messages.push(message)

      // state.chats = {
      //   ...chats,
      // }
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
