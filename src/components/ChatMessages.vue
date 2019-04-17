<template>
  <div class="chat-messages">
    <ul class="chat-messages-list">
      <li v-for="(message, i) in chat.messages" :key="i">
        <message :message="message" />
      </li>
    </ul>
    <div class="new-message">
      <form @submit.prevent="sendMessage">
        <input type="text" name="new-message" id="new-message" v-model="text">
        <button>
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import bus from '../EventBus'
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
    Message,
  },
  data() {
    return {
      text: '',
    }
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
    sendMessage() {
      const newMessage = { 
        text: this.text,
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

</style>
