<template>
  <div class="chat-list-view-item">
    <div>
      {{ chat.name }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    chat: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    name() {
      const { name, group, users } = this.chat
      let chatName = group ? name : ''
      if (! group) {
        let [otherUser] = users.filter(user => user.id !== this.user.id)
        chatName = otherUser.username
      }
      return chatName
    }
  }
}
</script>

<style lang="scss">
.chat-list-view-item {
  cursor: pointer;
  border-bottom: solid 1px #eaeaea;
  padding: 1em;

  &:hover {
    background-color: #eaeaea;
  }
}
</style>
