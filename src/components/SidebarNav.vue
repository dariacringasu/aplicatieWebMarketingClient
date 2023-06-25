<script setup>
import { useRoute } from 'vue-router';
import { ref } from "vue";
import router from '../router';
import { computed } from 'vue';
import store from "../store";
import { handleLogout } from '@/components/utils/performLogout';

const url = window.location.href;

const role = computed(() => store.getters.getCurrentUser.role);
const companyName = computed(() => store.getters.getCurrentUser.companyName);
const email = computed(() => store.getters.getCurrentUser.email);
const userId = computed(() => store.getters.getCurrentUser.userId);


function goToUserProfile(){
    router.push("/userprofile");
}

function goToStatistics(){
  router.push("/statistics");
}

function goAddVideo(){
    router.push("/addvideo");
}

function goMainPage(){
    router.push("/mainpage");
}

function goAllClients(){
    router.push("/allclients");
}

function goVideoPlayer(){
    router.push("/videoplayer");
}

function goApprovedVideos(){
  router.push("/approvedvideos");
}

function goPendingVideos(){
  router.push("/pendingvideos");
}

</script>

<template>
  <div class="side-nav">
    <div class="user">
      <img src="src/components/icons/images/adv.png" class="user-img">
      <div>
        <h2>{{ companyName }}</h2>
        <p>{{email}}</p>
        <p v-if="role === 'ADMIN'"> ADMIN</p>
      </div>
  
      
    </div>
    <ul>
      <li v-if="role === 'USER'" @click="goAddVideo">
        <img src="src/components/icons/images/add.png">
        <p >Add New Video </p></li>

      <li v-if="role === 'USER'" @click="goToUserProfile">
        <img src="src/components/icons/images/profile.png">
        <p>My Profile</p></li>

      <li v-if="role === 'ADMIN'" @click="goAllClients">
        <img src="src/components/icons/images/users.png">
        <p>All Users</p></li>

      <li v-if="role === 'ADMIN'" @click="goVideoPlayer">
        <img src="src/components/icons/images/video-player.png">
        <p>Video Player</p></li>

      <li v-if="url !== 'http://localhost:5173/mainpage'" @click="goMainPage">
        <img src="src/components/icons/images/icons8-website-50.png">
        <p>Main Page</p></li>

      <li v-if="role === 'ADMIN'" @click="goApprovedVideos">
        <img src="src/components/icons/images/approve.png">
        <p>Approved Videos</p></li>

      <li v-if="role === 'USER'" @click="goToStatistics">
        <img src="src/components/icons/images/reports.png">
        <p>Reports</p></li>

      <li v-if="role === 'ADMIN'" @click="goPendingVideos">
        <img src="src/components/icons/images/pending.png">
        <p>Pending Videos</p></li>
    </ul>
    <ul>
      <li @click="handleLogout">
        <img src="src/components/icons/images/logout.png">
        <p>Logout</p></li>
    </ul>
  </div>
</template>

<style scoped>
 .header{
  width: auto;
  height: 100vh;
} 
.side-nav{
  width: 110px;
  height: 100%;
  /* position: fixed; */
  top:0;
  left:0;
  padding:30px 15px;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: width 0.5s;
}

.user{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
  font-size: 12px;
  padding: 10px;
  border-radius: 8px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.user div{
  display: none;
}

.user h2{
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
  color: #111;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user p{
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: #111;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.user-img{
  width: 25.2px;
}

.star-img{
  width: 20px;
  display: none;
}

ul{
  list-style: none;
  padding: 0 15px;
}

ul li{
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

ul li img{
  width: 30px;
  margin-right: 0px;
}

ul li p{
  white-space: nowrap;
  color: #111;
  display: none;
}

.side-nav:hover{
  width: 250px;
}
.side-nav:hover .user div{
  display: block;
}

.side-nav:hover .user{
  width: 100%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
}

.side-nav:hover .star-img{
  display: block;
}

.side-nav:hover .user-img{
  margin:0.5;
}

.side-nav:hover ul li p{
   display: block;
}

.side-nav:hover ul li img{
  margin-right: 10px;
}
.side-nav:hover ul li{
  justify-content: flex-start;
}
</style>

