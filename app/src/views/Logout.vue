<template lang="pug">
#logout
  small-container
    .button-container
      a.button(@click="onLogOutClick") Logout
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import SmallContainer from '@/components/SmallContainer'

export default {
  components: {
    SmallContainer,
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    ...mapActions(['logOut']),
    async onLogOutClick() {
      await this.logOut()
      if (this.isLoggedIn === false) {
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>
<style lang="stylus" scoped>
#logout,
.button-container
  display flex
  justify-content center
</style>
