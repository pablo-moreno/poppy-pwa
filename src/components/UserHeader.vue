<template>
  <div>
    <nav>
      {{ user.firstName }} {{ user.lastName }}
    </nav>
    <span @click="logout" class="logout">
      Logout!
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    user: state => state.auth.user
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('login')
    }
  }
}
</script>