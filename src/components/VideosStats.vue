<script setup>
import { computed } from 'vue';
import store from "../store";
import { ref } from 'vue';
import { watch } from 'vue';
import StatsNumbers from './StatsNumbers.vue';

const userId = computed(() => store.getters.getCurrentUser.userId);

const responseClientVideos = await fetch('/api/video/findByClientId/'+ userId.value);
const clientVideos = await responseClientVideos.json();

const responseLocations = await fetch('/api/stats/mostAppearedLocations/'+userId.value);
const locations = await responseLocations.json();

const responseStatisticsUser = await fetch('/api/stats/byUserId/'+userId.value);
const stats = await responseStatisticsUser.json();

const selectedVideoIndex = ref(null);
const videoStats = ref(null);

async function handleVideoClick(index, videoId) {
  selectedVideoIndex.value = index;
  const response = await fetch("/api/stats/"+ videoId);
  const statsPerVideo = await response.json();
  videoStats.value = statsPerVideo;
}
console.log("video stats: "+ videoStats.value)

function handleAllVideos(){
    selectedVideoIndex.value = null;
}


</script>

<template>
    <body>
	<section style="margin-top: 1%; margin-left: 20%;">
   
		<div class="container">
			
        <div class="details">
          <div class="name" @click="handleAllVideos">All videos</div>
          <div class="name" v-for="(clientVideo,index) in clientVideos" :key="clientVideo[0]" @click="handleVideoClick(index, clientVideo[0])">
            <p>{{ clientVideo[1] }}</p></div>
        </div>
        <div class="videos">
            <table v-if="selectedVideoIndex === null" class="content-table" id="myTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody v-for="(stat,index) in stats" :key="stat.id">
                    <tr>
                        <td>{{ index+1 }}</td>
                        <td>{{ stat.date }}</td>
                        <td>{{ stat.location }}</td>
                    </tr>
                </tbody>
            </table>

              <table v-if="selectedVideoIndex === 0"  class="content-table" id="myTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody v-for="(stat,index) in videoStats" :key="stat.id">
                    <tr>
                        <td>{{ index+1 }}</td>
                        <td>{{ stat.date }}</td>
                        <td>{{ stat.location }}</td>
                    </tr>
                </tbody>
            </table>  

             
            <table v-if="selectedVideoIndex === 1" class="content-table" id="myTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody v-for="(stat,index) in videoStats" :key="stat.id">
                    <tr>
                        <td>{{ index+1 }}</td>
                        <td>{{ stat.date }}</td>
                        <td>{{ stat.location }}</td>
                    </tr>
                </tbody>
            </table> 
            
        </div>
		</div>
	</section>

	
	
</body>

</template>

<style scoped>
*{
    color: #625d5d;
}

body{
    background-image: url("src/components/icons/images/background.png");
    background-size: cover;
    /* background-position: center; */
    background-attachment: fixed;
    background-repeat: no-repeat;
    justify-content: center;   
}

.container{
  height: 50vh;
  width: 150vh;
  opacity: 0.5;
  border: none;
  border-radius: 30px;
  background: rgba(255,255,255,0.7);  
  margin-left: -20%;
}

.details{
  height: 50vh;
  width: 40vh;
  float:left;
  padding-top:20px ;
}

.videos{
  height: 50vh;
  width: 110vh;
  float: right;
  overflow-y: auto;
  /* left: -400px; */
}

.name {
  background-color: #e0e0e0;
  padding: 20px 50px;
  height: 8vh;
  transition: background-color 0.3s;
  justify-content: center;
}

.name:hover {
  background-color: #F5D645;
}

.content-table {
    border-collapse: collapse;
    margin: 15px 100px;
    font-size: 0.9em;
    width: 80vh;
    max-height: 5px;
    border-radius: 5px 5px 0 0;
    overflow-y: scroll;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    
}

.content-table thead tr {
    background-color: rgba(255,255,255,0.7);
    color: #625d5d;
    text-align: left;
    font-weight: bold;
    overflow-y: scroll;
}

.content-table th,
.content-table td {
    padding: 12px 15px;
}

.content-table tbody tr {
    border-bottom: 1px solid #625d5d;
}

.content-table tbody tr:nth-of-type(even) {
    color: #625d5d;
    /* background-color: rgba(255,255,255,0.7); */
}

.content-table tbody tr:last-of-type {
    border-bottom: 2px solid #625d5d;
}

.content-table tbody tr.active-row {
    font-weight: bold;
    color: #625d5d;
    background-color: rgba(255,255,255,0.7);
}
</style>