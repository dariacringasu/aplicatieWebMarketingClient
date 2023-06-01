<script setup>
import { ref } from 'vue';

// const response = await fetch("/api/video/findByApprove/0");
// const pendingVideos = await response.json();

const videoVisible = ref(false);

const pendingVideos = ref([]);

const fetchPendingVideos = async () => {
  try {
    const response = await fetch("/api/video/findByApprove/0");
    pendingVideos.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};

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


async function approve(videoId) {
    if (confirm("Are you sure you want to approve this video?")) {
    try {
      const approveResponse = await fetch("/api/video/setApprove/" + videoId, {
        method: 'PUT',
      });

      if (approveResponse.ok) {
        console.log(`Video with ID ${videoId} approved successfully.`);
        await fetchPendingVideos(); // Refresh the list of pending videos
      } else {
        throw new Error('Failed to approve video.');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }
}

fetchPendingVideos();
</script>

<template>

    					<h3>Listed Videos</h3>
              <div class="container">
    <table class="content-table" id="myTable">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Date of Posting</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="tableBody" v-for="(video,index) in pendingVideos" :key="video.id">
			<tr :class="{'active-row': index % 2 === 1}">
				<td>{{ index+1 }}</td>
				<td @click="showVideo(video)">{{ video.title }}</td>
				<td>{{ video.description }}</td>
				<td>{{ video.dateOfPosting }}</td>
                <td> <button @click="approve(video.id)">Approve</button></td>
			</tr>
        </tbody>
      </table>
    </div>
      <div v-if="videoVisible" class="video-popup"> 
      <video width="320" height="240" autoplay="autoplay" controls>
        <source src="" type="video/mp4">
            <source src="" type="video/ogg">
      </video>
	  <button @click="closeVideo">Close</button>
    </div>
  
</template>

<style scoped> 


h3{
  background-color: white;
  -webkit-background-clip: text;
  margin-left: -25%;
  top:30px;
  font-family: "Archivo Black", sans-serif;
  font-weight: normal;
  font-size: 3.5em;
  text-align: center;
}



.content-table {
    border-collapse: collapse;
    margin: 120px 100px;
    font-size: 0.9em;
    width: 100vh;
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