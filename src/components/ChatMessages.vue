<template>
  <div class="chat-messages">
    <div>
      <h2>
        {{ chat.name }}
      </h2>
    </div>
    <ul class="chat-messages-list">
      <message v-for="(message, i) in chat.messages" :key="i" :message="message" />
    </ul>
    <div class="new-message">
      <chat-input @input="text => sendMessage(text)" />
    </div>
  </div>
</template>

<script>
import bus from '../EventBus'
import ChatInput from './ChatInput'
import Message from './Message'
import { mapState } from 'vuex'

export default {
  props: {
    room: {
      type: String,
      required: true
    }
  },
  components: {
    ChatInput,
    Message,
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    chat() {
      const [c] = this.$store.state.chats.filter(chat => chat.id === this.room)
      return c
    }
  },
  methods: {
    sendMessage(text) {
      const newMessage = { 
        text,
        user: this.user,
        room: this.room
      }
      bus.$emit('post-message', newMessage)
      this.text = ''
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  background-color: #eaeaea;
}

.chat-messages {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &-list {
    height: 100%;
  }
}
</style>
