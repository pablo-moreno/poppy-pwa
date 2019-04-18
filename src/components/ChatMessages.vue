<template>
  <div class="chat-messages">
    <div class="chat-messages-header">
      <h2>
        {{ chat.name }}
      </h2>
      <div v-if="userWriting">
        {{ userWriting }} is writing...
      </div>
      <div v-else>
        <span v-for="(user, i) in users" :key="`user-${i}`">
          {{ user.username }}<span v-if="i < users.length - 1">, </span>
        </span>
      </div>
    </div>
    <ul class="chat-messages-list">
      <message v-for="(message, i) in chat.messages" :key="i" :message="message" />
    </ul>
    <div class="new-message">
      <chat-input 
        @input="text => sendMessage(text)"
        @start-writing="startWriting"
        @stop-writing="stopWriting"
      />
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
    },
  },
  data() {
    return {
      userWriting: undefined
    }
  },
  components: {
    ChatInput,
    Message,
  },
  beforeMount() {
    bus.$on('user-is-writing', this.userIsWriting)
    bus.$on('user-stopped-writing', this.userStoppedWriting)
  },
  beforeDestroy() {
    bus.$off('user-is-writing')
    bus.$off('user-stopped-writing')
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    chat() {
      const [c] = this.$store.state.chats.filter(chat => chat.id === this.room)
      return c
    },
    users() {
      return this.chat.users
    },
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
    },
    startWriting() {
      bus.$emit('start-writing', {
        id: this.user.id, 
        username: this.user.username
      }, this.room)
    },
    stopWriting() {
      bus.$emit('stop-writing', {
        id: this.user.id,
        username: this.user.username
      }, this.room)
    },
    userIsWriting(user, room) {
      console.log('[chat-messages] User is writing', user, room)
      const { username } = user
      this.userWriting = username
    },
    userStoppedWriting() {
      console.log('[chat-messages] User stopped writing')
      this.userWriting = undefined
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

  &-header {
    display: flex;
    flex-direction: column;

    h2 {
      margin: .25em;
    }
  }

  &-list {
    height: 100%;
  }
}

.hidden {
  visibility: hidden;
}
</style>
