<template>
  <div class="container mt-3">
    <Win/>
    <!-- <Lose/> -->
    <b-progress :value="timer" variant="success" striped :animated="animate"></b-progress>
    {{countTimer}}
    <div class="health-bar" style="display:flex; justify-content:space-between;">
      <div class="health-status player-one">
        <span>Player one </span>
        <img class="img-test" v-for="i in this.$store.state.player1Health" :key="i" src="@/assets/like.png" alt="heart" style="height: 20px; width: 20px;">
      </div>
      <div class="health-status player-one">
        <img v-for="i in this.$store.state.player2Health" :key="i" src="@/assets/like.png" alt="heart" style="height: 20px; width: 20px;">
        <span> Player two</span>
      </div>
    </div>
    <div class="card-container mt-5" v-for="(data,index) in question" :key="data.id">
      <div class="card-question" v-if="page === index">
        <b-card :title="'Question No. '+(index+1)" sub-title="Geometry">
          <b-card-text class="mt-4">
            {{data.question}}
          </b-card-text>
        </b-card>
      </div>
      <div class="card-answer mt-5" v-if="page === index">
        <b-container class="bv-example-row" v-if="!clicked">
          <b-row class="mt-3">
            <b-col class="answer-col" @click="random == 0 ? checkAnswer(data.answer) : checkAnswer(data.firstdummy)">{{random == 0 ? data.answer : data.firstdummy}}</b-col>
            <b-col class="answer-col" @click="random == 1 ? checkAnswer(data.answer) : checkAnswer(data.seconddummy)">{{random == 1 ? data.answer : data.seconddummy}}</b-col>
          </b-row>
          <b-row class="mt-3">
            <b-col class="answer-col" @click="random == 2 ? checkAnswer(data.answer) : checkAnswer(data.thirddummy)">{{random == 2 ? data.answer : data.thirddummy}}</b-col>
            <b-col class="answer-col" @click="random == 3 ? checkAnswer(data.answer) : checkAnswer(data.firstdummy)">{{random == 3 ? data.answer : data.firstdummy}}</b-col>
          </b-row>
        </b-container>
        <b-container fluid v-if="clicked">
          <b-card-text>{{userAnswer}}</b-card-text>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import db from '../../config/firestore'
import Win from '@/components/ModalCondition'
import Lose from '@/components/Lose'
export default {
  name: 'helloworld',
  components : {
    Win,
    Lose
  },
  data(){
    return {
      clicked: false,
      page: 0,
      timer: 0,
      healthOne: this.$store.state.player1Health,
      healthTwo: this.$store.state.player2Health,
      question: [],
      userAnswer: '',
      random : 0,
      animate: true,
      player: localStorage.getItem('player')
    }
  },
  methods:{
    checkAnswer(val){
      this.clicked = true
      this.userAnswer = val
      let correct = this.question.filter(item =>{
        return item.answer === val
      })
      if(correct.length === 0 && this.player === 'player2'){
        this.healthTwo -= 1
        db.collection('room').doc(`${this.$route.params.id}`).update({
          [`${this.player}.life`]: this.healthTwo
        })
      }else if(correct.length === 0 && this.player === 'player1'){
        this.healthOne -= 1
        db.collection('room').doc(`${this.$route.params.id}`).update({
          [`${this.player}.life`]: this.healthOne
        })
      }
    },
    getAllQuestion(){
      db.collection('banksoal').
      onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.question.push({id:doc.id,...doc.data()})
        });
      });
    },
    countdown(){
      let test = setInterval(() => {
        if ((this.page == 9 && this.timer == 100) || this.healthOne == 0 || this.healthTwo == 0 || this.$store.state.stopTimer){
          db.collection('room').doc(`${this.$route.params.id}`).update({
            end : true
          })
          // this.$router.push('/')
          clearInterval(test)

        }

        if(this.clicked ===false && this.timer >= 100 ){
          if(this.player === 'player2'){
            this.healthTwo -= 1
            db.collection('room').doc(`${this.$route.params.id}`).update({
              [`${this.player}.life`]: this.healthTwo
            })
          }
          if(this.player === 'player1'){
            this.healthOne -= 1
            db.collection('room').doc(`${this.$route.params.id}`).update({
              [`${this.player}.life`]: this.healthOne
            })
          }

        }

        if(this.timer < 100){  
          this.timer += 10
        }
        else if(this.timer >= 100){
          let randomNum = Math.floor(Math.random()*4)
          this.random = randomNum
          this.clicked = false
          this.userAnswer = '' 
          this.page +=1
          this.timer = 0
        }

      },1000)
    }
  },
  computed : {
    countTimer() {
      return this.countdown()
    }
  },
  created(){
    this.getAllQuestion()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-answer{
  border: 2px solid rgba(0, 0, 0, 0.125);
  padding: 10px;
}
.answer-col{
  border: 2px solid rgba(0, 0, 0, 0.125);
  margin-left: 2px;
}
.answer-col:hover{
  background-color: rgba(36, 2, 2, 0.699)
}
.health-status , .img-test{
  transition: 0.7s;
}
.nice{
  background-color: red;
}
</style>
