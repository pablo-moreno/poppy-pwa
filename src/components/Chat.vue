<template>
  <div class="chat">
    <div class="chat-list">
      <user-header />
      <chat-list-view :chats="chats" @change-chat="chat => setCurrentChat(chat)" />
    </div>
    <div class="chat-messages">
      <chat-messages :room="currentRoom" v-if="currentRoom" />
      <div v-if="!currentRoom">
        You have not selected any chat!
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '../EventBus'
import ChatListView from './ChatListView'
import ChatMessages from './ChatMessages'
import UserHeader from './UserHeader'

export default {
  components: {
    ChatListView,
    ChatMessages,
    UserHeader,
  },
  data() {
    return {
      currentRoom: null
    }
  },
  computed: mapState({
    chats: state => state.chats,
    user: state => state.auth.user
  }),
  mounted() {
    bus.$emit('user-connected', this.user)

    bus.$on('user-rooms', (rooms) => {
      bus.$emit('subscribe', rooms.map(room => room._id))
      this.$store.dispatch('setChats', rooms)
    })

    bus.$on('new-message', (message) => {
      console.log('We have received a new message', message)
      this.$store.dispatch('addMessage', message)
    })
  },
  beforeDestroy() {
    bus.$off('new-message')
    bus.$off('user-rooms')
  },
  methods: {
    setCurrentChat(chat) {
      this.currentRoom = chat.id
    },
  }
}
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  height: 100vh;
  width: 100vw;

  .chat-list {
    width: 35%;
  }

  .chat-messages {
    width: 65%;
  }
}
</style>
