<template>
  <ul class="chat-list-view">
    <li v-for="(chat, i) in chats" :key="`chat-${i}`">
      <chat-list-view-item :chat="chat" @click.native="changeRoom(chat)" />
    </li>
  </ul>
</template>

<script>
import ChatListViewItem from './ChatListViewItem'
import { mapState } from 'vuex'

export default {
  props: {
    chats: {
      type: Array,
      required: true
    }
  },
  components: {
    ChatListViewItem,
  },
  methods: {
    changeRoom(chat) {
      console.log('changed chat', chat)
      this.$emit('change-chat', chat)
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
