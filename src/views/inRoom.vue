<template>
  <div>
    <div v-if="!this.roomStatus">
    <center> <div id="roomlist-title">{{ roomtitle }}</div> </center>
    <div class="table-wrapper">
      <div class="thead-wrapper">
        <div class="head-item">No.</div>
        <div class="head-item">Player's Name</div>
        <div class="head-item">Role</div>
        </div>
        <div class="tbody-wrapper"> <!-- looping body item -->
          <div class="body-item">
            <div class="body-item-number">1</div>
            <div class="body-item-name">{{player1.name}}</div> 
            <div class="body-item-name">Room Master</div> 
          </div>
          <div class="body-item">
            <div class="body-item-number">2</div>
            <div class="body-item-name">{{player2.name}}</div>
            <div class="body-item-name">Participant</div> 
          </div>
        </div>
    </div>
    <center>
      <button v-if="player2.name" @click="toGame()" class="hvr-grow-shadow start-room-btn">Start</button>
      <button @click="toHome()" class="hvr-grow-shadow leave-room-btn">Leave</button>
      <div v-if="!player2.name" id="form-name">
        <div style="background-color:#FFFBF0; width: 500px;" class="card">
          <div class="card-body">
            <h5 class="card-title">Enter your name to Join: </h5>
            <input v-model="name" class="form-control" type="text" placeholder="Enter your name"> <br>
            <button @click="join" type="button" id="submit-btn" class="hvr-float-shadow btn">Submit</button>
          </div>
        </div>
      </div>
   </center>
  </div>
  <div v-if="this.roomStatus=== true">
    <inGame/>
  </div>
    </div>

</template>

<script>
import InGame from '../components/HelloWorld'
import db from '../../config/firestore'
export default {
  components:{
    InGame
  },
    data() {
        return {
            roomtitle: '',
            roomStatus:'',
            name: '',
            player1:{
              name : '',
              life : '',
            } ,
            player2:{
              name : '',
              life : '',
            },
            player1Life: '',
            player2Life: '',
            questions: [],
            selected: '',
            randomPosition: [],
            ans: [],
            raw: '',
            correctAns: '',
            questDatabase: ''
        }
    },
    methods: {
      fetchDatabase () {
        db.collection('room').doc(`${this.$route.params.id}`)
          .onSnapshot(doc => {
            console.log(doc.data())
            this.player1.name = doc.data().player1.name
            this.player2.name = doc.data().player2.name
            this.$store.commit('PLAYER1_HEALTH', doc.data().player1.life)
            this.$store.commit('PLAYER2_HEALTH', doc.data().player2.life)
            this.roomStatus = doc.data().status
            // this.questDatabase = doc.data().data nnti di STORE
          })
      },
      join () {
        localStorage.setItem('name', this.name)
        let payload = {
          name: this.name,
          link: this.$route.params.id
        }
        this.$store.dispatch('join', payload)
      },
      toHome () {
          this.$router.push('/')
          localStorage.removeItem('room')
      }, 
      toGame () {
          db.collection('room').doc(`${this.$route.params.id}`).update({
            status: true
          })
          .then(_=>{
            console.log(this.roomStatus,'ini di INROOM')
            this.fetchDatabase()
            this.$store.commit('STATUS_GAME', this.roomStatus)
            
          })

          
      } 
    },
    created() {
        this.fetchDatabase()
        this.roomtitle = localStorage.getItem('room')
    }
}
</script>

<style scoped>
#submit-btn {
  background-color: #B53471;
  font-weight: bold;
  color: white;
}

.table-wrapper {
  margin: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: aquamarine;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}

.thead-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
}

.head-item {
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  padding-left: 15px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 3px solid rgba(24,211,175, 0.5);
}

.head-item:first-child {
  background-color: #ecd2af;
  width: 10%;
  color: #444c5c;
}

.head-item:nth-child(2) {
  background-color: #444c5c;
  width: 90%;
  color: #ecd2af;
}

.head-item:nth-child(3) {
  background-color: #444c5c;
  width: 90%;
  color: #ecd2af;
}

.tbody-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.body-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.body-item-number {
  background-color: #ecd2af;
  width: 10%;
  color: #444c5c;
  text-align: left;
  font-size: 16px;
  padding-left: 15px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.body-item-name {
  background-color: #444c5c;
  width: 90%;
  color: #ecd2af;
  text-align: left;
  font-size: 16px;
  padding-left: 15px;
  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.body-item-name:hover {
  background-color: #20b2aa;
  color: #f5f5f5;
}

.enter-room-btn {
  width: 30%;
  background-color: #444c5c;
  height: 40px;
  border: none;
  color: #ffa500;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
}

.enter-room-btn:hover {
  height: 60px;
  width: 18%;
}

.start-room-btn {
  width: 20%;
  background-color: #16a085;
  height: 40px;
  border: none;
  color: white;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
  margin: 25px;
  border-radius: 2px;
  font-weight: bold;
}

.leave-room-btn {
  width: 20%;
  background-color: #b71540;
  height: 40px;
  border: none;
  color: white;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
  margin: 50px;
  border-radius: 2px;
  font-weight: bold;
}

#roomlist-title {
  font-family: "Trebuchet MS", Helvetica, sans-serif;
  font-size: 49px;
  letter-spacing: -1.4px;
  word-spacing: -1.4px;
  color: #FFFFFF;
  font-weight: normal;
  text-decoration: overline;
  font-style: oblique;
  font-variant: small-caps;
  text-transform: capitalize;
  padding-top: 50px;
  padding-left: 50px;
}

.hvr-grow-shadow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: box-shadow, transform;
  transition-property: box-shadow, transform;
}
.hvr-grow-shadow:hover, .hvr-grow-shadow:focus, .hvr-grow-shadow:active {
  box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>