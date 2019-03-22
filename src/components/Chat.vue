<template>
<div class="chat">
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
      message: ''
    }
  },
  mounted() {
    bus.$on('connection', function() {
      console.log('Connected succesfully')
      bus.$emit('user-connected', { id: 8943245, username: 'pablo' })
    })

    bus.$on('new-message', (message) => {
      this.messages.push(message)
    })
  },
  methods: {
    sendMessage() {
      console.log('New message sent: ', this.message)
      const newMessage = { text: this.message }
      bus.$emit('post-message', newMessage)
      this.message = ''
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
