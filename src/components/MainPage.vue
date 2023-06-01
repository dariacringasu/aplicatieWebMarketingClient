<script setup>
import { RouterLink, RouterView } from "vue-router";
import router from '../router';
import store from "../store";
import { computed } from '@vue/reactivity';
import { onMounted } from "vue";
import { ref } from "vue";
import { watchEffect, onBeforeUnmount, onBeforeMount } from "vue";



const role = computed(() => store.getters.getCurrentUser.role);
const companyName = computed(() => store.getters.getCurrentUser.companyName);
const email = computed(() => store.getters.getCurrentUser.email);
const userId = computed(() => store.getters.getCurrentUser.userId);


const responseUsers = await fetch("/api/client/getUsersNumber");
const usersNumber = await responseUsers.json();
// const usersNumber = 66;
console.log(usersNumber);


const numbUsers = ref(0);
const timeUsers = 2000/usersNumber;

const numbUsersLeftProgress = ref(0);
const numbUsersRightProgress = ref(0);

const responseVideos = await fetch("/api/video/getApprovedNumber");
const videosNumber = await responseVideos.json();
console.log(videosNumber);

const numbVideos = ref(0);
const timeVideos = 2000/videosNumber;

const numbVideosLeftProgress = ref(0);
const numbVideosRightProgress = ref(0); 

onMounted(() => {
  setInterval(()=> {
    if(numbUsers.value === usersNumber){
      clearInterval();
    }
    else if (numbUsers.value <= usersNumber){
      numbUsers.value +=1;

      if(numbUsers.value>50){
        numbUsersLeftProgress.value = numbUsers.value + (50 - numbUsers.value);
        numbUsersRightProgress.value = numbUsers.value -50;
        document.getElementById("leftProgress").style.transform= "rotate("+numbUsersLeftProgress.value*3.6+"deg)";
        document.getElementById("rightProgress").style.transform= "rotate("+numbUsersRightProgress.value*3.6+"deg)";
      }else
       {
        numbUsersLeftProgress.value = numbUsers.value;
        document.getElementById("leftProgress").style.transform= "rotate("+numbUsersLeftProgress.value*3.6+"deg)";
      }
    }
  }, timeUsers);

  setInterval(()=> {
    if(numbVideos.value === videosNumber){
      clearInterval();
    }
    else if (numbVideos.value <= videosNumber){
      numbVideos.value +=1;

      if(numbVideos.value>50){
        numbVideosLeftProgress.value = numbVideos.value + (50 - numbVideos.value);
        numbVideosRightProgress.value = numbVideos.value -50;
        document.getElementById("leftProgressVideos").style.transform= "rotate("+numbVideosLeftProgress.value*3.6+"deg)";
        document.getElementById("rightProgressVideos").style.transform= "rotate("+numbVideosRightProgress.value*3.6+"deg)";
      }else
       {
        numbVideosLeftProgress.value = numbVideos.value;
        document.getElementById("leftProgressVideos").style.transform= "rotate("+numbVideosLeftProgress.value*3.6+"deg)";
      }
    }
  }, timeVideos)
})








function goUserProfile(){
    router.push("/userprofile");
}

function goAddVideo(){
    router.push("/addvideo");
}
function goAllClients(){
    router.push("/allclients");
}

</script>

<template>
  <link href="https://fonts.googleapis.com/css?family=Archivo+Black&display=swap" rel="stylesheet">
    <!-- <button @click="goAllClients">ALL CLIENTS</button>
    <button @click="goAddVideo">add video</button> -->
<body>
<div class="container2">
    <section class="one">
      <!-- <div> -->
      <h1 class="gradient-text">publicity</h1>
     <!-- <img src="src\components\icons\images\publicity-low-resolution-logo-white-on-transparent-background (1).png"> -->
<div class="content">
      <!-- cerc 1 -->
      <div class="bottom">
      <div class="circleFormTop">
        <div class="circular">
          <div class="inner">
          </div>

          <div class="numb">{{ numbUsers }}
          </div>

          <div class="circle">

            <div class="bar right">
              <div class="progress" id="rightProgress">
              </div>
            </div>

            <div class="bar left">
              <div class="progress" id="leftProgress">
              </div>
            </div>

          </div>

        </div>
      </div>
      

<!-- cerc 2 -->
      
      <div class="circleFormTop">
        <div class="circular">
          <div class="inner">
          </div>

          <div class="numb"> {{ numbVideos }}
          </div>

          <div class="circle">

            <div class="bar right">
              <div class="progress" id="rightProgressVideos">
              </div>
            </div>

            <div class="bar left">
              <div class="progress" id="leftProgressVideos">
              </div>
            </div>

          </div>

        </div>
      </div>
      </div>

      <div class="text" style="top:60px">
        <div class="textUsers">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
           sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Augue lacus viverra vitae congue eu 
            consequat ac felis donec.<br/>
        </div>
        <div class="textVideos" style="top:20px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
           sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Augue lacus viverra vitae congue eu 
            consequat ac felis donec.<br/>
        </div>
      </div>
    </div>
    </section>
    <section class="two" ref="sectionElement">
       <h1 id="h1secondsection"> How to make yourself <br/>stand out?</h1>
        <div class="secondcontent">
          <div class="firstdiv">text</div>
          <div class="seconddiv">text</div>
        </div>

       
    </section>
    <section class="three">
        <!-- <img src="src\components\icons\images\PUBLICITY2.png"> -->
        <!-- <h2>test3</h2> -->
    </section>
</div>
</body> 
</template>

<style scoped>

.gradient-text {
  margin-left: 0.2%;
  background-color: white;
  -webkit-background-clip: text;
}

h1 {
  margin-left: -10%;
  font-family: "Archivo Black", sans-serif;
  font-weight: normal;
  font-size: 10em;
  /* text-align: center; */
  margin-bottom: 0;
  margin-bottom: 1.5em;

}

*{
    color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
    height: 100vh; 
    background: none;
}

section{
    height: 100vh;
    justify-content: center;
    align-items: center;
    scroll-snap-align: start;
}


.container2{
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;

}



.content{
  margin-top: -20%;
  height: 50%;
  width: 50px;
}
.text{
  margin-left: 25vh;
  height: 40vh;
  width: 60vh;
}

.textUsers{
  height:50%;
  width: 100%;
}

.textVideos{
  height: 50%;
  width: 100%;
}


/* cercuri  */
.circleFormTop {
  margin-top: 30%;
  margin-left: 30%;
  margin-right: 60%;
}

.circleFormTop2 {
  margin-top: 90%;
  margin-left: 90%;
}

.circleFormTop .circular {
  height: 5vw;
  width: 5vw;
  background-color: transparent;
  position: relative;
  transform: scale(2);
}

.circleFormTop .circular .inner {
  position: absolute;
  z-index: 6;
  height: 4vw;
  width: 4vw;
  margin: 0.5vw 0 0 0.5vw;
  background: white;
  border-radius: 100%;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

.circleFormTop .circular .bar {
  position: absolute;
  height: 5vw;
  width: 5vw;
  /* background: ; */
  opacity: 4.5; 
    background: rgba(255,255,255,0.5);
  border-radius: 50%;
  clip: rect(0vw, 5vw, 5vw, 2.5vw);
}

.circleFormTop .circle .bar .progress {
  position: absolute;
  height: 5vw;
  width: 5vw;
  /* background: #ff9616; */
  background-image: linear-gradient(45deg, #E94861, #F5D645);
  border-radius: 50%;
  clip: rect(0vw, 2.5vw, 5vw, 0vw);
}

.circleFormTop .circular .numb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 1vw;
  font-weight: 500;
  color: #000;
}

.circleFormTop .circle .left .progress {
  z-index: 1;
  animation: left 2s linear both;
  animation-delay: 1s;
}


.circleFormTop .circle .right {
  z-index: 3;
  transform: rotate(180deg);
}


.circleFormTop .circle .right .progress {
  animation: right 2s linear both;
  animation-delay: 3s;
}

.circleFormBottom {
  margin-top: 40%;
  /* margin-bottom: 30%; */
  margin-left: 30%;
}

.circleFormBottom .circularBottom {
  height: 5vw;
  width: 5vw;
  background-color: transparent;
  position: relative;
  transform: scale(2);
}

.circleFormBottom .circularBottom .innerBottom {
  position: absolute;
  z-index: 6;
  height: 4vw;
  width: 4vw;
  margin: 0.5vw 0 0 0.5vw;
  background: #ededed;
  border-radius: 100%;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
}

.circleFormBottom .circularBottom .barBottom {
  position: absolute;
  height: 5vw;
  width: 5vw;
  background: #4b4c4e;
  border-radius: 50%;
  clip: rect(0vw, 5vw, 5vw, 2.5vw);
}

.circleFormBottom .circleBottom .barBottom .progressBottom {
  position: absolute;
  height: 5vw;
  width: 5vw;
  background: #ff9616;
  border-radius: 50%;
  clip: rect(0vw, 2.5vw, 5vw, 0vw);
}

.circleFormBottom .circularBottom .numbBottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  font-size: 1vw;
  font-weight: 500;
  color: #000;
}

.circleFormBottom .circleBottom .leftBottom .progressBottom {
  z-index: 1;
  animation: leftBottom 2s linear both;
  animation-delay: 1s;
}


.circleFormBottom .circleBottom .rightBottom {
  z-index: 3;
  transform: rotate(180deg);
}

.circleFormBottom .circleBottom .rightBottom .progressBottom {
  animation: rightBottom 2s linear both;
  animation-delay: 3s;
}


/* page */

.sidebar {
  height: 100%;
  min-width: auto;
  align-items: left;
  padding: 0.5vw;
  border-right: 0.2vw solid black;
}

.filter-container {
  display: flex;
  flex-direction: column;
}




.bottom {
  margin-top: -20%;
  height: 30vw;
  width: 20vw;
  display: flex;
  flex-direction: column;
  /* flex-direction: row; */
  align-items: center;
  float:left;
}


/* second slide */

.secondcontent{
  height: 40%;
  width: 90%;
  /* top: 10%; */
  left: 10%;
  margin-left: -10%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.firstdiv{
  height: 100%;
  width: 40%;
  opacity: 4.5; 
    background: rgba(255,255,255,0.5)
}
.seconddiv{
  height: 100%;
  width: 40%;
  left:50px;
  opacity: 4.5; 
  background: rgba(255,255,255,0.5)
}


#h1secondsection{
  background-color: white;
  -webkit-background-clip: text;
  margin-left: -25%;
  top:30px;
  font-family: "Archivo Black", sans-serif;
  font-weight: normal;
  font-size: 4em;
  text-align: center;
  /* text-align: center; */
  /* margin-bottom: 0;
  margin-bottom: 1.5em; */
}



</style>