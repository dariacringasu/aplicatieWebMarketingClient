<script setup>
import router from '../router';
import { computed } from 'vue';
import store from "../store";
import { handleLogout } from '@/components/utils/performLogout';
// import handleLogout from './utils/performLogout';

const role = computed(() => store.getters.getCurrentUser.role);
const companyName = computed(() => store.getters.getCurrentUser.companyName);
const email = computed(() => store.getters.getCurrentUser.email);
const userId = computed(() => store.getters.getCurrentUser.userId);

function goToUserProfile(){
    router.push("/userprofile");
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
</script>

<template>
<!-- <div class="header"> -->
  <div class="side-nav">
    <div class="user">
      <!-- <img src="src/components/icons/images/user.png" class="user-img"> -->
      <div>
        <h2>{{ companyName }}</h2>
        <p>{{email}}</p>
        <p v-if="role === 'ADMIN'"> ADMIN</p>
      </div>
      <!-- <img src="src/components/icons/images/star.png" class="star-img"> -->
      
    </div>
    <ul>
      <li @click="goAddVideo">
        <!-- <img src="src/components/icons/images/dashboard.png"> -->
        <p >Add New Video </p></li>
      <li  @click="goToUserProfile">
        <!-- <img src="src/components/icons/images/dashboard.png"> -->
        <p>User Profile</p></li>
      <li @click="goAllClients">
        <!-- <img src="src/components/icons/images/dashboard.png"> -->
        <p>All Clients</p></li>
      <li @click="goVideoPlayer">
        <!-- <img src="src/components/icons/images/dashboard.png"> -->
        <p>Video Player</p></li>
      <li @click="goMainPage">
        <!-- <img src="src/components/icons/images/dashboard.png"> -->
        <p>Main Page</p></li>
    </ul>
    <ul>
      <li @click="handleLogout">
        <!-- <img src="src/components/icons/images/logout.png"> -->
        <p>Logout</p></li>
    </ul>
  </div>
<!-- </div> -->
</template>

<style scoped>
 .header{
  width: auto;
  height: 100vh;
  /* height: 100%; */
   /* background-image: url(src/components/icons/images/background.png);
  background-position: center;
  background-size: cover;  */
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
  width: 40px;
  border-radius: 50%;
  margin: auto;
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
  margin:0;
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

