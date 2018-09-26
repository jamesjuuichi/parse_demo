<template lang="pug">
#app
  #nav
    router-link(to="/") Home
    router-link(v-if="!isLoggedIn" to="/login") Login
    template(v-else)
      router-link(to="/logout") Logout
      a {{user.get('username')}}
  router-view
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['user']),
  },
}
</script>

<style lang="stylus">
@require '~@/assets/common'
@require '~@/assets/colors'
@require '~@/assets/functions'

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
#nav
  padding to-rem(16px)
  text-align center
  a
    font-size to-rem(24px)
    padding 0 to-rem(16px)
    color primary-dark-color
    &.router-link-exact-active
      color primary-light-color
</style>
