<template>
  <li class="message" :class="{'mine': mine}">
    <span class="message-text">
      {{ message.text }}
    </span>
    <span class="message-date">
      {{ message.creationDate }}
    </span>
    <span class="message-status">
      
    </span>
  </li>
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
@import '@/assets/css/utils/_colors.scss';

.message {
  border-radius: 999px;
  background-color: darken(#eaeaea, 5%);
  padding: .75em;
  margin: .5em;
  align-self: flex-start;
}

.mine {
  background-color: $primary;
  color: white;
  align-self: flex-end;
}
</style>
