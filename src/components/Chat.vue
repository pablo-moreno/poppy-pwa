<template>
<div class="chat">
  <ul>
    <li v-for="chat in $store.state.chats" :key="`chat-${chat._id}`" @click="setCurrentChat(chat)">
      {{ chat.name }}
    </li>
  </ul>
  <ul>
    <li v-for="(message, index) in messages" :key="index">
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
      messages: [],
      message: '',
      currentRoom: undefined
    }
  },
  mounted() {
    bus.$on('connection', function() {
      console.log('Connected succesfully')
      bus.$emit('user-connected', { _id: '5c97748bb9619f00291ae453', username: 'pablo' })
    })

    bus.$on('user-rooms', (rooms) => {
      console.log('bus user-rooms: ', rooms)
      this.$store.dispatch('setChats', rooms)
    })

    bus.$on('new-message', (room, message) => {
      this.messages.push(message)
    })
  },
  methods: {
    sendMessage() {
      console.log('New message sent: ', this.message)
      const newMessage = { 
        text: this.message,
        user: {
          _id: '5c97748bb9619f00291ae453'
        },
        room: this.currentRoom
      }
      bus.$emit('post-message', newMessage)
      this.message = ''
    },
    setCurrentChat(chat) {
      this.currentRoom = chat
    }
  }
}
</script>

<style scoped lang="scss">
.chat {

}
.chats {
}
.messages {
}
</style>
