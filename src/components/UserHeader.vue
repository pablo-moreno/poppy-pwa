<template>
  <div class="user-header">
    <h2>
      {{ user.firstName }}
    </h2>
    <div class="user-header-buttons">
      <button @click="changePanel('friends')" class="ripple">
        <i class="fa fa-user-friends"></i>
      </button>
      <button @click="changePanel('config')" class="ripple">
        <i class="fa fa-cog"></i>
      </button>
      <button @click="logout" class="ripple">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
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
    },
    config() {
      this.$emit('open-config')
    },
    changePanel(panel) {
      this.$emit('change-panel', panel)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/utils/_colors.scss';

.user-header {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background-color: $primary-dark;
  align-items: center;

  &-buttons {
    display: flex;
  }

  h2 {
    color: white;
  }
}

button {
  width: 16px;
  height: 16px;
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 8px;
}
</style>
