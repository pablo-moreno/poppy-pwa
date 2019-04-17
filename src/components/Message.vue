<template>
  <div class="message" :class="{'mine': mine}">
    <span class="message-text">
      {{ message.text }}
    </span>
    <span class="message-date">
      {{ message.sentDate }}
    </span>
    <span class="message-status">
      
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    message: {
      type: Object,
      required: true,
    }
  },
  computed: {
    mine() {
      return this.message.user.id === this.$store.state.auth.user.id
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
