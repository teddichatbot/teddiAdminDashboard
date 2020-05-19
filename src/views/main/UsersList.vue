<template>
  <div class="home">
    <User />
  </div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/root/Users.vue'

export default {
  name: 'RootUserList',
  components: {
    User
  }
}
</script>