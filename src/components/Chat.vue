<template>
<div class="chat">
  <ul>
    <li v-for="chat in chats" :key="`chat-${chat.id}`" @click="setCurrentChat(chat)">
      {{ chat.name }}
    </li>
  </ul>
  <h4 v-if="currentRoom">{{ chats[currentRoom].name }}</h4>
  <ul v-if="currentRoom !== null">
    <li v-for="(message, index) in currentRoomMessages" :key="index">
      {{ message.user.username }}: {{ message.text }}
    </li>
  </ul>
  <form @submit.prevent="sendMessage" v-if="currentRoom !== null">
    <input type="text" name="new-message" v-model="message">
    <button :disabled="message === ''">Send</button>
  </form>
  <div v-else>
    You haven't selected any conversation yet.
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '../EventBus'

export default {
  data() {
    return {
      messages: {},
      message: '',
      currentRoom: null
    }
  },
  computed: {
    ...mapState({
      chats: state => state.chats,
      currentRoomMessages() { 
        return this.chats[this.currentRoom].messages
      },
      user: state => state.auth.user
    }),
  },
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
    sendMessage() {
      const newMessage = { 
        text: this.message,
        user: this.user,
        room: this.currentRoom
      }
      bus.$emit('post-message', newMessage)
      this.message = ''
    },
    setCurrentChat(chat) {
      this.currentRoom = chat.id
    },
  }
}
</script>

<style scoped lang="scss">

</style>
