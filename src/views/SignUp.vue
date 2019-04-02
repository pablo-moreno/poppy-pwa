<template>
  <div class="sign-up-view">
    <form @submit.prevent="signUp">
      <input type="text" v-model="user.username" id="username" placeholder="User name" required>
      <input type="password" v-model="user.password" id="password" placeholder="Password" required>
      <input type="password" v-model="user.password2" id="password2" placeholder="Repeat password" required>
      <input type="email" v-model="user.email" id="email" placeholder="E-mail" required>
      <input type="text" v-model="user.firstName" id="firstName" placeholder="First name">
      <input type="text" v-model="user.lastName" id="lastName" placeholder="Last name">
      <button>
      Create account!
      </button>
      <router-link :to="{name: 'login'}">
        Already have an account? Sign in!
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        password2: '',
        email: '',
        firstName: '',
        lastName: ''
      }
    }
  },
  methods: {
    async signUp() {
      try {
        const user = this.user
        const response = await this.$http.post('auth/sign-up', user)
        this.$router.push('login')
      } catch (error) {
        console.log('error', error)
      }
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
