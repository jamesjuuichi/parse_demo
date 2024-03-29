import Vue from 'vue'
import Vuex from 'vuex'
import {
  logInWithFacebook as logInWithFacebookAPI,
  logInWithToken as logInWithTokenAPI,
  getCurrentUser as getCurrentUserAPI,
  logOut as logOutAPI,
} from '@/api/auth'
import { getItems, createItem as createItemAPI } from '@/api/Item'
import { search as searchAPI } from '@/api/search'

Vue.use(Vuex)

const state = {
  user: null,
  items: [],
  searchResult: [],
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ITEMS(state, items) {
    state.items = items
  },
  APPEND_ITEM(state, item) {
    state.items.push(item)
  },
  SET_SEARCH_RESULT(state, items) {
    state.searchResult = items
  }
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
      commit('SET_ITEMS', [])
    }
  },
  async fetchItems({ commit }) {
    commit('SET_ITEMS', await getItems(0, 1000))
  },
  async createItem({ commit }, { name, price, isPrivate, category }) {
    commit('APPEND_ITEM', await createItemAPI(name, price, isPrivate, category))
  },
  async search({ commit }, term) {
    commit('SET_SEARCH_RESULT', await searchAPI(term))
  }
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
