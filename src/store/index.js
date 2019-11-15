import Vue from 'vue'
import Vuex from 'vuex'
import db from '../../config/firestore'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statusRoom : false,
    player1Health : '',
    player2Health : '',
    stopTimer : false
  },
  mutations: {
    STATUS_GAME(state, payload){
      console.log(payload, 'SINI')
      state.statusRoom = payload
    },
    PLAYER1_HEALTH(state, payload){
      state.player1Health = payload
    },
    PLAYER2_HEALTH(state, payload){
      state.player2Health = payload
    },
    STOP_TIMER(state){
      state.stopTimer = true
    }
  },
  actions: {
    room (context, payload) {
      db.collection('room').add({
        status : false,
        end : false,
        player1: {
          name: payload,
          life: 5
        }
      })
        .then(docRef => {
          localStorage.setItem('player', 'player1')
          router.push('/roomlist/' + docRef.id)
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function (error) {
          console.error('Error adding document: ', error)
        })
    },
    join (context, payload) {
      db.collection('room').doc(`${payload.link}`).update({
        player2: {
          name: payload.name,
          life: 5
        }
      })
        .then(function () {
          localStorage.setItem('player', 'player2')
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    },
    correct (context, payload) {
      context.commit('ATK')
      let target
      if (payload.player === 'player1') {
        target = 'player2'
      } else {
        target = 'player1'
      }
      db.collection('room').doc(`${payload.link}`).update({
        [`${target}.life`]: this.state.life
      })
    },
    wrong (context, payload) {
      context.commit('MINUS')
      db.collection('room').doc(`${payload.link}`).update({
        [`${payload.player}.life`]: this.state.life
      })
    }
  },
  modules: {
  }
})