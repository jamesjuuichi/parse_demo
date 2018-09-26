import Parse from 'parse'

const logInWithFacebook = async () => {
  try {
    return await Parse.FacebookUtils.logIn()
  } catch (error) {
    console.error(error)
    return null
  }
}

const logOut = async () => {
  try {
    await Parse.User.logOut()
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const provider = {
  authenticate(options) {
    if (options.success) {
      options.success(this, {})
    }
  },

  restoreAuthentication(/* authData */) {},

  getAuthType() {
    return 'myauth'
  },

  deauthenticate() {},
}

const logInWithToken = async token => {
  let authData = {
    authData: {
      id: token,
    },
  }
  const user = new Parse.User()
  try {
    return await user._linkWith(provider, authData)
  } catch (error) {
    console.error(error)
  }
}

const getCurrentUser = () => {
  return Parse.User.current()
}

export { logInWithFacebook, logInWithToken, getCurrentUser, logOut }
