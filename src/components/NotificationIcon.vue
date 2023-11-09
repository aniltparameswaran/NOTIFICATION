<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<div id="app">
    <nav class="navbar">
      <div class="logo">My App</div>
      <ul class="nav-links">
        <li><a href="/">HOME</a></li>
        <li><a href="/about">ABOUT</a></li>
        <li><a href="/contact">CONTACT</a></li>
      </ul>
  
    <!-- <div class="notification-icon">
      <i class="fas fa-bell icon-white hover-icon" @click="toggleNotifications" :class="{ 'glowing-icon': hasNewNotification }"></i>
      <span v-if="notificationsCount > 0" class="badge">{{ notificationsCount }}</span>
    </div> -->

<div class = "notification">
  <a href = "#">
  <div class = "notBtn" href = "#">
    <!--Number supports double digets and automaticly hides itself when there is nothing between divs -->
    <!-- <div v-if="notificationsCount > 0" class="badge">{{ notificationsCount }}</div> -->
    <i class="fas fa-bell icon-white hover-icon" @click="toggleNotifications" :class="{ 'glowing-icon': hasNewNotification }"></i>
    <span v-if="notificationsCount > 0" class="badge">{{ notificationsCount }}</span>
    <div class = "box">
        <div class = "display">
          <div class = "nothing"> 
            <i class="fas fa-child stick"></i> 
            <div class = "cent">Looks Like your all caught up!</div>
          </div>
          <div class = "cont"><!-- Fold this div and try deleting evrything inbetween -->
             <div class = "sec new" v-for="notification in notifications" :key="notification.id">
               <a href = "">
               <div class = "profCont">

                </div>
               <div class = "txt">{{ notification.message }}</div>
              <div class = "txt sub">11/7 - 2:30 pm</div>
               </a>
            </div>
        
         </div>
        </div>
     </div>
  </div>
    </a>
</div>

    </nav>
    <div>
    

      

    <!-- Add a section to display notifications -->
    <!-- <div class="mesaage-list" v-if="showingNotifications">
      <ul class="menu list pl0 pa0 ma0">
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification.message }}
      </li>
      </ul>
    </div> -->
    
  </div>
    <div class="dev_class">
    <input v-model="message" name="message" placeholder="Enter a message" />
    <button @click="sendMessage">Send</button>
  </div>
    <router-view />
  </div>


</template>


<script>






import * as signalR from "@microsoft/signalr";


export default {
  name: "App",
  data() {
    return {
      notificationsCount: 0,
      notifications: [],
      showingNotifications: false,
      hasNewNotification: false, 
      hubConnection: null,
      myArray: [],
      massage: '',
    };
  },
  methods: {
    sendMessage() {
      console.log(this.message);
      const url = `https://localhost:44304/api/Notification?message=${this.message}`;
      console.log(url);

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },

})
  .then((res) => res)
  .then((posts) => {
    // we received our list of posts
    console.log(posts);
  });
      // Toggle the visibility of notifications
      
    },
    

    // toggleNotifications() {
    //   // Toggle the visibility of notifications
    //   this.showingNotifications = !this.showingNotifications;
      
    // },

  },
  mounted() {
    // Connect to the SignalR hub
    this.hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44304/notificationHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    withCredentials: true, // Include credentials
  })
  .build();

    this.hubConnection.start().then(() => {
      this.hubConnection.on("ReceiveNotification", (message) => {
        // Handle incoming notifications
        console.log(message);
        this.myArray.push(message);
        console.log(this.myArray);
        this.notificationsCount += 1;
        this.notifications.push({ id: Date.now(), message });
        this.hasNewNotification = true;
        
      });
    });
    
  },
};


</script>

<style scoped>

.dev_class{
padding-top: 100px;
padding-left: 880px;
}

.navbar {
background: linear-gradient(135deg, #FFFFFF, #ced8f7);
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  box-shadow: 0 2px 23px rgba(0, 0, 0, 0.2);
}

.logo {
  font-size: 24px;
  color:grey;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li {
  font-size: 18px;
}

.nav-links a {
  text-decoration: none;
  color:grey;

}

.nav-links a:hover {
  text-decoration: underline;
}
.notification-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.notification-icon i {
  font-size: 28px;
  
}

.badge {
  background-color: red;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 5px;
  
}

.notification-list {
  position: absolute; 
  top: 40px; 
  right: 0; 
  max-width: 300px; 
  background-color: #0e0c0c;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none; 
}

.notification-list.active {
  display: block; 
  
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  
}
/* Define the glowing effect */
.glowing-icon {
  animation: glowing 1.5s ease infinite;
}

@keyframes glowing {
  0% {
    color: white;
  }
  50% {
    color: gold;
  }
  100% {
    color: white;
  }
}





a{
  text-decoration: none;
  color: black;
}

a:visited{
  color: black;
}

.box::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
  border-radius: 5px
}

.box::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
  border-radius: 5px
}

.box::-webkit-scrollbar-thumb
{
	background-color: black;
	border: 2px solid black;
  border-radius: 5px
}

header{
  -moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
  box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
  height: 110px;
  vertical-align: middle;
}

h1{
 float: left;
  padding: 10px 30px
}



.icons{
  display: inline;
  float: right
}

.notification{
  padding-top: 30px;
  position: relative;
  display: inline-block;
}

.number{
  height: 22px;
  width:  22px;
  background-color: #d63031;
  border-radius: 20px;
  color: white;
  text-align: center;
  position: absolute;
  top: 23px;
  left: 60px;
  padding: 3px;
  border-style: solid;
  border-width: 2px;
}

.number:empty {
   display: none;
}

.notBtn{
  transition: 0.5s;
  cursor: pointer
}

.fas{
  font-size: 25pt;
  padding-bottom: 10px;
  color: black;
  margin-right: 40px;
  margin-left: 40px;
}

.box{
  width: 400px;
  height: 0px;
  border-radius: 10px;
  transition: 0.5s;
  position: absolute;
  overflow-y: scroll;
  padding: 0px;
  left: -300px;
  margin-top: 5px;
  background-color: #F4F4F4;
  -webkit-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.2);
  -moz-box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
  box-shadow: 10px 10px 23px 0px rgba(0,0,0,0.1);
  cursor: context-menu;
}

.fas:hover {
  color: #d63031;
}

.notBtn:hover > .box{
  height: 60vh
}

.content{
  padding: 20px;
  color: black;
  vertical-align: middle;
  text-align: left;
}

.gry{
  background-color: #F4F4F4;
}

.top{
  color: black;
  padding: 10px
}

.display{
  position: relative;
}

.cont{
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #F4F4F4;
}

.cont:empty{
  display: none;
}

.stick{
  text-align: center;  
  display: block;
  font-size: 50pt;
  padding-top: 70px;
  padding-left: 80px
}

.stick:hover{
  color: black;
}

.cent{
  text-align: center;
  display: block;
}

.sec{
  padding: 25px 10px;
  background-color: #F4F4F4;
  transition: 0.5s;
}

.profCont{
  padding-left: 15px;
}

.profile{
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  width: 75px;
  float: left;
}

.txt{
  vertical-align: top;
  font-size: 1.25rem;
  padding: 5px 10px 0px 115px;
}

.sub{
  font-size: 1rem;
  color: grey;
}

.new{
  border-style: none none solid none;
  border-color: red;
}

.sec:hover{
  background-color: #BFBFBF;
}

.badge{
    background-color: red;
    color: #fff;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
    margin-left: -45px;
}


</style>
