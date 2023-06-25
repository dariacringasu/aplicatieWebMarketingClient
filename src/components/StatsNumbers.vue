<script setup>
import { computed } from 'vue';
import store from "../store";

const userId = computed(() => store.getters.getCurrentUser.userId);

const responseClientVideos = await fetch('/api/video/findByClientId/'+ userId.value);
const clientVideos = await responseClientVideos.json();

const responseLocations = await fetch('/api/stats/mostAppearedLocations/'+userId.value);
const locations = await responseLocations.json();


const responseStatisticsUser = await fetch('/api/stats/byUserId/'+userId.value);
const stats = await responseStatisticsUser.json();


</script>

<template>
<div class="usersNumbers">
    <div class="numbersComp">
        <div >
            <div>{{stats.length}}</div>
        </div>

        
    </div> 
        
    <div class="usersRoles">
        <div class="userModerator">
            vizionari
        </div>
       
    </div>
</div>

</template>

<style scoped>

.usersNumbers{
    margin-top:2%;
    margin-left: 3%;
    background-color: #ededed;
    height: 6vw;
    width: 38.5vw;
}
.usersNumbers .numbersComp {
    display: inline-flex;
    justify-content:space-between ; 
    width: 35vw; 
    height: 3.5vw; 
    margin-top: 1.5%;
    margin-left: 5%;
}

.usersNumbers .numbersComp .numberCircle {
    border-radius: 50%;
    width: 2.7vw;
    height: 2.7vw;
    padding: 3px; 
    background: transparent;
    border: 4px solid #000;
    color: #000;
    text-align: center;
    font: 2vw Arial, sans-serif;
    color: #ff9616;
}
.usersRoles {
    display: inline-flex;
    height: 40%;
    width: 100%;
    /* font-size: 2vw Roboto black; */
}

.usersRoles .userStandard{
    padding-left: 3%;
    font: 1.5vw Roboto black;
}

.usersRoles .userModerator{
    padding-left: 13%;
    font: 1.5vw Roboto black;
}

.usersRoles .userTech{
    padding-left: 16%;
    font: 1.5vw Roboto black;
}

.usersRoles .userAdmin{
    padding-left: 19%;
    font: 1.5vw Roboto black;
}
</style>