<template>
<div class="chat">
  <ul>
    <li v-for="chat in $store.state.chats" :key="`chat-${chat._id}`" @click="setCurrentChat(chat)">
      {{ chat.name }}
    </li>
  </ul>
  <h4 v-if="currentRoom">{{ currentRoom.name }}</h4>
  <ul v-if="currentRoom !== null">
    <li v-for="(message, index) in messages[currentRoom._id]" :key="index">
      {{ message.text }}
    </li>
  </ul>
  <form @submit.prevent="sendMessage">
    <input type="text" name="new-message" v-model="message">
    <button :disabled="message === ''">Send</button>
  </form>
</div>
</template>

<script>
import bus from '../EventBus'

export default {
  data() {
    return {
      messages: {},
      message: '',
      currentRoom: null
    }
  },
  beforeMount() {
    bus.$emit('user-connected', this.$store.state.auth.user)

    bus.$on('user-rooms', (rooms) => {
      rooms.forEach(room => {
        bus.$emit('subscribe', room._id)
        this.messages[room._id] = []
      })
      this.$store.dispatch('setChats', rooms)
    })

    bus.$on('new-message', (message) => {
      this.addMessage(message)
    })
  },
  methods: {
    sendMessage() {
      const { user } = this.$store.state.auth
      const newMessage = { 
        text: this.message,
        user: user,
        room: this.currentRoom
      }
      bus.$emit('post-message', newMessage)
      this.message = ''
    },
    setCurrentChat(chat) {
      this.currentRoom = chat
    },
    addMessage(message) {
      this.messages = {
        ...this.messages,
        [message.room]: [
          ...this.messages[message.room], 
          message
        ],
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
