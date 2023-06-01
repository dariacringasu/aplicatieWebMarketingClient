<script setup>
import { ref } from 'vue';

// const response = await fetch("/api/video/findByApprove/0");
// const pendingVideos = await response.json();

const videoVisible = ref(false);
const pendingVideos = ref([]);
const searchTerm = ref('');

const fetchPendingVideos = async () => {
  try {
    const response = await fetch("/api/video/findByApprove/1");
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


async function deleteVideo(videoId) {
    if (confirm("Are you sure you want to delete this video?")) {
    try {
      const approveResponse = await fetch("/api/video/delete/" + videoId, {
        method: 'DELETE',
      });

      if (approveResponse.ok) {
        console.log(`Video with ID ${videoId} deleted successfully.`);
        await fetchPendingVideos(); // Refresh the list of pending videos
      } else {
        throw new Error('Failed to delete video.');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }
}

fetchPendingVideos();

function searchVideos() {
  // Trigger search when the input changes
  if (searchTerm.value === '') {
    // If the search term is empty, show all videos
    pendingVideos.value = [...pendingVideos.value];
  } else {
    // Filter the videos based on the search term
    const regex = new RegExp(searchTerm.value, 'i');
    pendingVideos.value = pendingVideos.value.filter(video => regex.test(video.title));
  }
}


</script>

<template>

<h3 class="mb-4">Listed Videos</h3>
<input v-model="searchTerm" type="text" placeholder="Search video by title" @input="searchVideos">
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
        <tbody v-for="(video,index) in pendingVideos" :key="video.id">
			<tr :class="{'active-row': index % 2 === 1}">
				<td>{{ index+1 }}</td>
				<td @click="showVideo(video)">{{ video.title }}</td>
				<td>{{ video.description }}</td>
				<td>{{ video.dateOfPosting }}</td>
                <td> <button @click="deleteVideo(video.id)">Delete</button></td>
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

</template>

<style scoped> 
.content-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    width: 400px;
    border-radius: 5px 5px 0 0;
    overflow-y: scroll;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    font-weight: bold;
}

.content-table th,
.content-table td {
    padding: 12px 15px;
}

.content-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.content-table tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
</style>