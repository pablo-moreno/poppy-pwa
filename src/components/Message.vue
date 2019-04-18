<template>
  <li class="message" :class="{'mine': mine}">
    <header>
      <span class="message-title">
        {{ message.user.username }}
      </span>
    </header>
    <div message-body>
      <span class="message-text">
        {{ message.text }}
      </span>
      <span class="message-date">
        {{ date | format }}
      </span>
      <span class="message-status">
        
      </span>
    </div>
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
  display: flex;
  flex-direction: column;
  min-width: 96px;

  header {
    display: flex;
    align-self: flex-start;
    cursor: pointer;
    font-weight: bold;
  }

  &-date {
    font-size: 70%;
  }

  &-body {
    display: flex;
    justify-content: space-between;
  }
}

.mine {
  background-color: $primary;
  color: white;
  align-self: flex-end;
}
</style>
