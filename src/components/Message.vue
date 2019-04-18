<template>
  <li class="message" :class="{'mine': mine}">
    <span class="message-text">
      {{ message.text }}
    </span>
    <span class="message-date">
      {{ date | format }}
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
    },
    date() {
      return new Date(parseInt(this.message.creationDate))
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

  &-date {
    font-size: 70%;
  }
}

.mine {
  background-color: $primary;
  color: white;
  align-self: flex-end;
}
</style>
