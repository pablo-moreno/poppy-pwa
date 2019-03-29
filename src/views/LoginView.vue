<template>
  <div class="login-view">
    <form class="login-form" @submit.prevent="login">
      <input v-model="email" class="input-field" type="email">
      <input v-model="password" class="input-field" type="password">
      <button class="button">
        Log in!
      </button>
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

</style>
