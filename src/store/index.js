import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    healOne: 0,
    healTwo: 0
  },
  mutations: {
    CHANGE_HEAL () {
      this.healOne += 1000
    }
  },
  actions: {
  },
  modules: {
  }
})