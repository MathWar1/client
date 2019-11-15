<template>
  <div>
    <center> <div id="roomlist-title">Room List</div> </center>
    <div class="table-wrapper">
      <div class="thead-wrapper">
        <div class="head-item">No.</div>
        <div class="head-item">Room Name</div>
      </div>
      <div class="tbody-wrapper"> <!-- looping body item -->
        <div class="body-item">
          <div class="body-item-number">1</div>
          <div class="body-item-name" @click="setRoomName('Room Name')">Room Name</div> <!-- @click disini -->
        </div>
        <div class="body-item">
          <div class="body-item-number">2</div>
          <div class="body-item-name" @click="setRoomName('Room Name 2')">Room Name 2</div>
        </div>
      </div>
    </div>
    <div class="select-room">
      <div class="selected-room-name"><strong>{{ roomName }}</strong></div> <!-- Isi room name di sini -->
      <button @click="toRoom()" class="enter-room-btn">Enter Room</button>
    </div>
    <center>
      <!-- Button trigger modal -->
      <button type="button" class="btn create-btn hvr-pulse-grow" data-toggle="modal" data-target="#exampleModal">
        Create a Room
      </button>
      <button @click="exit()" class="hvr-pulse-grow leave-room-btn">Quit</button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create a Room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input class="form-control" type="text" placeholder="Enter a room name">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </center>
  </div>
</template>

<script>
export default {
    data() {
      return {
        roomName: ''
      }
    },
    methods: {
      setRoomName: function(toBeRoom) {
        console.log('jalan')
        console.log('tobeRoom', toBeRoom)
        this.roomName = toBeRoom
      },
      toRoom () {
        this.$router.push(`/roomlist/1`)
        localStorage.setItem('room', this.roomName)
      }, 
      exit() {
        this.$router.push('/')
      }
    }
}
</script>

<style scoped>
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

.select-room {
  margin: 50px 80px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  background-color: #1dd1a1;
  align-items: center;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}

.selected-room-name {
  width: 70%;
  background-color: #1dd1a1;
  height: 40px;
  padding-left: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #444c5c;
  font-weight: 500;
}

.enter-room-btn {
  width: 30%;
  background-color: #444c5c;
  height: 40px;
  border: none;
  color: white;
  font-weight: bold;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
}

.enter-room-btn:hover {
  height: 60px;
  width: 18%;
}

.create-btn {
  width: 20%;
  background-color: #16a085;
  height: 40px;
  border: none;
  color: white;
  transition: all 0.5s ease-in-out;
  font-weight: bold;
}

.create-btn:hover {
  background-color: #f6b93b;
  font-weight: bold;
  color: black;
}

@-webkit-keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
@keyframes hvr-pulse-grow {
  to {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}
.hvr-pulse-grow {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}
.hvr-pulse-grow:hover, .hvr-pulse-grow:focus, .hvr-pulse-grow:active {
  -webkit-animation-name: hvr-pulse-grow;
  animation-name: hvr-pulse-grow;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
}

.leave-room-btn {
  width: 20%;
  background-color: #b71540;
  height: 40px;
  border: none;
  color: white;
  font-weight: bold;
  transition: all 0.5s ease-in-out;
  margin: 50px;
  border-radius: 2px;
}

.leave-room-btn:hover {
  background-color: #f6b93b;
  color: black;
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

</style>