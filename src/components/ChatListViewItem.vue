<template>
  <div class="chat-list-view-item">
    <div>
      {{ name }}
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
        let [otherUser] = users.filter(user => user._id !== this.user._id)
        chatName = otherUser.username
      }
      return chatName
      }
    }
}
</script>
