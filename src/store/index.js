import { createStore } from 'vuex'

export default createStore({
  state: {
    clickedElementClass: '',
  },

  getters: {
    CLICKED_ELEMENT(state) {
      return state.clickedElementClass
    },
  },

  mutations: {
    SET_CLICKED_ELEMENT(state, payload) {
      state.clickedElementClass = payload
    },
  },

  actions: {
    GET_POSTS_FROM_SERVER({ commit }) {
      commit()
    },
    ACTION_SET_CLICKED_ELEMENT({ commit }, payload) {
      commit('SET_CLICKED_ELEMENT', payload)
    },
  },

  modules: {},
})
