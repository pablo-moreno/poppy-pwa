<template>
  <div class="home">
    <nav>
      {{ user.firstName }} {{ user.lastName }}
    </nav>
    <span @click="logout" class="logout">
      Logout!
    </span>
    <chat />
  </div>
</template>

<script>
import Chat from '@/components/Chat'

export default {
  name: 'home',
  components: {
    Chat
  },
  computed: {
    user() { return this.$store.state.auth.user }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('login')
    }
  }
}
</script>

<style lang="scss">
.logout {
  cursor: pointer;
}
</style>
