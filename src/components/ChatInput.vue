<template>
  <form @submit.prevent="send">
    <div class="chat-input">
      <input ref="chat-input" type="text" autocomplete="off" v-model="text" placeholder="Write your next awesome message :D">
      <span @click="send"><i class="fa fa-paper-plane"></i></span>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    send() {
      this.$emit('input', this.text)
      this.text = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/utils/_colors.scss';

form {
  padding: .5em;
}

input {
  border: none;
  width: 90%;
  font-size: 16px;
}

i {
  cursor: pointer;
  color: $primary;
}

.chat-input {
  padding: 1em;
  border: solid 1px #eaeaea;
  border-radius: 999px;
  display: flex;
  justify-content: space-between;
}
</style>
