 <script setup>
import router from '../router';
import store from "../store";
import { computed } from '@vue/reactivity';
import { ref} from 'vue';

const userId = computed(() => store.getters.getCurrentUser.userId);
console.log(store.getCurrentUser)

const response = await fetch("/api/client/getUserById?userId="+userId.value);
const userDetails = await response.json(); 
const videos = userDetails.videos;

const videoVisible = ref(false);

const showVideo = async (video) => {
  const selectedVideo = video;
  videoVisible.value = true;
  console.log(selectedVideo);
  console.log("id selected video " + selectedVideo.id);
  try {
    const response = await fetch("/api/image/getFileDataNameById/" + selectedVideo.id);
    const videoFile = await response.json();
    console.log(videoFile);
    const videoName = videoFile.name;
    console.log("video name: " + videoName);
    const videoPath = "src/videos/" + videoName;
	console.log("video psth "+ videoPath);
    document.querySelector("video").setAttribute('src', videoPath);
  } catch (error) {
    console.error(error);
  }
};

const closeVideo = () => {
  videoVisible.value = false;
};

function goBack(){
	router.push("/mainpage");
}



</script>

<template>
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<body>
	<section style="margin-top: 1%; margin-left: 20%;">
   
		<div class="container">
			
        <div class="details">
          <h2>User Details</h2>
          <div class="name">{{userDetails.companyName}}</div>
          <div class="name">{{userDetails.email}}</div>
          <div class="name">{{userDetails.address}}</div>
          <div class="name">{{userDetails.dateOfJoin}}</div>
        </div>


        <div class="videos">
         
          <table class="content-table" id="myTable">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Date of Posting</th>
          </tr>
        </thead>
        <tbody v-for="(video,index) in videos" :key="video.id">
			<tr :class="{'active-row': index % 2 === 1}">
				<td>{{ index+1 }}</td>
				<td @click="showVideo(video)">{{ video.title }}</td>
				<td class="hidden">{{ video.description }}</td>
				<td>{{ video.dateOfPosting }}</td>
			</tr>
        </tbody>
      </table>

      <div v-if="videoVisible" class="video-popup"> 
      <video width="320" height="240" autoplay="autoplay" controls>
        <source src="" type="video/mp4">
            <source src="" type="video/ogg">
      </video>
	  <button @click="closeVideo">Close</button>
    </div>

        </div>
		</div>
	</section>

	
	
</body>

</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
*{
  color: black;
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

.details h2{
  margin-left: 20px;
  margin-bottom: 2vh;
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
.video-popup {
  position: fixed;
  top: 60%;
  left:87%;
  transform: translate(-50%, -50%);
  padding: 20px;
}

.content-table {
  /* table-layout: fixed; */
    border-collapse: collapse;
    margin: 25px 0;
    /* left:-10px ; */
    font-size: 0.9em;
    width: 100%;
    border-radius: 5px 5px 0 0;
    /* overflow-y: scroll; */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

/* .hidden{
  text-overflow: ellipsis;
    width: 1px;
    overflow: hidden;
    white-space: nowrap;
} */

.content-table thead tr {
    /* background-color: rgba(255,255,255,0.7); */
    background: linear-gradient(to right, #E94861, #F5D645) ;
    /* background-color: #E94861; */
    color: black;
    text-align: left;
    font-weight: bold;
    white-space: nowrap; /* Added property */
   overflow: hidden; /* Added property */
  /* text-overflow: ellipsis; */
}

.content-table th,
.content-table td {
    padding: 12px 15px;
}

.content-table tbody tr {
    border-bottom: 1px solid #625d5d;
}


.content-table tbody tr:last-of-type {
    border-bottom: 2px solid #625d5d;
}

.content-table tbody tr.active-row {
    font-weight: bold;
    /* color: #625d5d; */
    opacity: 5.5rem;
    background: linear-gradient(to right, rgba(245, 214, 69, 0.7), rgba(233, 72, 97, 0.7)) ;
    
}


.shadow {
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}

.profile-tab-nav {
	min-width: 250px;
	background-color: transparent;
      padding: 20px;
      color: #ffffff;
}

.tab-content {
	flex: 1;
}

.form-group {
	margin-bottom: 1.5rem;
}

.nav-pills a.nav-link {
	padding: 15px 20px;
	border-bottom: 1px solid #ddd;
	border-radius: 0;
	color: #333;
}
.nav-pills a.nav-link i {
	width: 20px;
}

.img-circle img {
	height: 100px;
	width: 100px;
	border-radius: 100%;
	border: 5px solid #fff;
}

.my-button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      background-color: #4CAF50;
      color: #ffffff;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .my-button:hover {
      background-color: #45a049;
	}


</style> 


