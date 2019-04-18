<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="login">
      <input v-model="email" class="input-field" type="email" placeholder="User name">
      <input v-model="password" class="input-field" type="password" placeholder="Password">
      <button class="ripple">
        Log in!
      </button>
      <router-link :to="{name: 'signup'}">
        You don't already have an account? Sign up here!
      </router-link>
      <span>
        {{ error }}
      </span>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const { email, password } = this
        const user = await this.$http.post('auth/login', { email, password })
        this.$store.dispatch('login', user)
        this.$router.push({ name:'home' })
      } catch (error) {
        this.error = error.message
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  padding: 1em;
  display: flex;
  flex-direction: column;
  width: 360px;
}

input {
  padding: .5em;
  border: solid 1px #eaeaea;
  border-radius: 8px;
  margin-bottom: .25em;
  font-size: 1rem;
}
</style>
