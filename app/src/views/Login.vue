<template lang="pug">
#login
  small-container
    .button-container
      a.button(@click="logInWithFacebookWrapper") Facebook Login
      template(v-if='showLoginViaToken')
        input(placeholder="Login with token" v-model="token")
        a.button(@click="logInWithTokenWrapper") Token login
    .message(v-if="message.text && message.text.length", :class="messageClasses") {{message.text}}
</template>
<script>
import classnames from 'classnames'
import toggles from '@/constants/toggles'
import { mapGetters, mapActions } from 'vuex'
import SmallContainer from '@/components/SmallContainer'

export default {
  components: {
    SmallContainer,
  },
  data() {
    return {
      message: {},
      token: '',
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    messageClasses() {
      return classnames({
        message: true,
        error: this.message.isError === true,
      })
    },
    showLoginViaToken() {
      return toggles.SHOW_LOGIN_VIA_TOKEN
    },
  },
  methods: {
    ...mapActions(['logInWithFacebook', 'logInWithToken']),
    async logInWithFacebookWrapper() {
      await this.logInWithFacebook()
      this.handleLogIn(this.isLoggedIn)
    },
    handleLogIn(isLoggedIn) {
      if (!isLoggedIn) {
        this.message = {
          text: 'Login failed',
          isError: true,
        }
      } else {
        this.$router.push({ name: 'home' })
      }
    },
    async logInWithTokenWrapper() {
      await this.logInWithToken(this.token)
      this.handleLogIn(this.isLoggedIn)
    },
  },
}
</script>
<style lang="stylus" scoped>
@require '~@/assets/colors'

#login,
.button-container
  display flex
  justify-content center

.message
  text-align center
  margin 1rem 0
  &.error
    color primary-dark-color
</style>
