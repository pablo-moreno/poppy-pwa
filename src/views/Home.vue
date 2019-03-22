<template>
  <div class="home">
    <chat />
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from "@/components/Chat.vue";

export default {
  name: "home",
  components: {
    Chat
  }
}
</script>
