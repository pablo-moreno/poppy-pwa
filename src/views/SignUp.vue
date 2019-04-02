<template>
  <div class="sign-up-view">
    <form @submit.prevent="signUp">
      <input type="text" v-model="username" id="username">
      <input type="password" v-model="password" id="password">
      <input type="password" v-model="password2" id="password2">
      <input type="email" v-model="email" id="email">
      <input type="text" v-model="firstName" id="firstName">
      <input type="text" v-model="lastName" id="lastName">
      <button>
      Create account!
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      email: '',
      firstName: '',
      lastName: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-up-view {
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  width: 360px;
}

input {
  margin-bottom: .25em;
  border-radius: 8px;
  border: solid 1px #eaeaea;
  font-size: 1rem;
  padding: .5em;
}
</style>
