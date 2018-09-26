import Vue from 'vue'
import Vuex from 'vuex'
import {
  logInWithFacebook as logInWithFacebookAPI,
  logInWithToken as logInWithTokenAPI,
  getCurrentUser as getCurrentUserAPI,
  logOut as logOutAPI,
} from '@/api/auth'

Vue.use(Vuex)

const state = {
  user: null,
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

const actions = {
  getCurrentUser({ commit }) {
    const user = getCurrentUserAPI()
    if (!!user === true) {
      commit('SET_USER', user)
    }
  },
  async logInWithFacebook({ commit }) {
    const user = await logInWithFacebookAPI()
    if (!!user === true) {
      commit('SET_USER', user)
    }
  },
  async logInWithToken({ commit }, token) {
    const user = await logInWithTokenAPI(token)
    if (!!user === true) {
      commit('SET_USER', user)
    }
  },
  async logOut({ commit }) {
    const isLoggedOut = await logOutAPI()
    if (isLoggedOut === true) {
      commit('SET_USER', null)
    }
  },
}

const getters = {
  isLoggedIn(state) {
    return !!state.user
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
