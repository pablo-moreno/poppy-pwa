<template>
  <div class="home">
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
}
</script>

<style lang="scss">
.logout {
  cursor: pointer;
}
</style>
