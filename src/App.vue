<template>
  <div id="app">
    <Modal v-if="condition" />
    <Lose v-if="!condition"/>
    <router-view/>
  </div>
</template>

<script>
import Modal from '@/components/ModalCondition.vue'
import Lose from '@/components/Lose.vue'

export default {
  components : {
    Modal, Lose
  },
  data () {
    return {
      condition: false
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
