
<script>
import { ref } from 'vue';
import QrcodeVue from 'qrcode.vue'


export default {
  components: {
    QrcodeVue
  },
  data() {
    return {
      qrcodeValue: ''
    };
  },
  
  mounted() {

    const qrcodeElement = document.getElementById("qrcode");


    window.addEventListener("DOMContentLoaded", () => {
      var currentVideoIndex;
      window.fetch('/api/video/findByApprove/1')
        .then(response2 => response2.json())
        .then(videosurls => {
          console.log(videosurls)
          window.fetch('src/videos/names.json')
            .then(response => response.json())
            .then(videoFiles => {
              var videoPath = "src/videos/";
              currentVideoIndex = 0;
               var videoSource = document.getElementById("videoSource");
              videoSource.src = videoPath + videoFiles[currentVideoIndex];
              var qrcode = document.getElementById("qrcode");
              this.qrcodeValue = videosurls[currentVideoIndex].urlmoreinfo;
              console.log(this.qrcodeValue)
              var myVideo = document.getElementById("myVideo");
              myVideo.load();

              myVideo.addEventListener("fullscreenchange", () => {
                if(!myVideo.isFullScreen){
                    qrcode.style.opacity = '1';
                } else {
                  qrcode.style.opacity = '0';
                }
              })

            

              myVideo.addEventListener("ended", () => {
                currentVideoIndex++;
                if (currentVideoIndex  < videoFiles.length) {
                  videoSource.src = videoPath + videoFiles[currentVideoIndex];
                  myVideo.load();
                  this.qrcodeValue = videosurls[currentVideoIndex].urlmoreinfo;
                  console.log(this.qrcodeValue)
                  myVideo.play();
                }
                else {
                currentVideoIndex = 0; // Reset to the first element
                videoSource.src = videoPath + videoFiles[currentVideoIndex];
                myVideo.load();
                this.qrcodeValue = videosurls[currentVideoIndex].urlmoreinfo;
                console.log(this.qrcodeValue);
                myVideo.play();
  }
               
              });


            });
        })
        .catch(error => console.error(error));
    });


  },
  methods:{
    async getLocation(){
      try{
        const response = await fetch('http://api.ipstack.com/check?access_key=a67804691339590f29558299487959a2');
        const data = await response.json();
        const city = data.city;
        console.log("city: "+ city);
        return city;
      } catch (error){
        console.log("erorr: "+ error)
        return null;
      }
      
    },

    getCurrentDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
},


 async addStats(videoId, urlmoreinfo) {
  const currentLocation = await this.getLocation();
  const currentDate = this.getCurrentDate();

  try {
    const response1 = await fetch("/api/video/getUserIdById/" + videoId);
    if (response1.ok) {
      const userIdFromVideo = await response1.json();
      const userId = userIdFromVideo; // Assuming the response already contains the user ID
      console.log("user id: " + userId);

      const response = await fetch("/api/stats/add/" + videoId + "/" + userId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          location: currentLocation,
          date: currentDate
        })
      });

      if (response.ok) {
        console.log("stats added");
        console.log("Redirecting..");
        window.location.href = 'https://' + urlmoreinfo;
      } else {
        throw new Error("Stats failed");
      }
    } else {
      throw new Error("Failed to fetch the user id");
    }
  } catch (error) {
    console.error(error);
  }
},


async redirectToQRCodeValue() {
  try {
    const qrcode = this.qrcodeValue;
    const response1 = await fetch('/api/video/getByUrl/' + qrcode);
    
    if (!response1.ok) {
      throw new Error("Failed to fetch video data");
    }
    
    const video = await response1.json();

    if (!video || !video.id) {
      throw new Error("Invalid video data");
    }

    const videoId = video.id;
    console.log("video id: " + videoId);

    await this.addStats(videoId, qrcode);
  } catch (error) {
    console.error(error);
  }
}
  }
}



</script> 

<template>
  <body>
  <!-- <div class="video-container"> -->
  <video id="myVideo" width="550" height="350"  autoplay muted>
    <source id="videoSource" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
 
  <div class="overlay">
    <div id="qrcodeWrapper" @click="redirectToQRCodeValue()">
      <qrcode-vue id="qrcode" :value="qrcodeValue" />
    </div>
  </div>
<!-- </div> -->
</body>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  background-color: black;
  /* width: 100%;
  height: 100%; */

  margin:0;
}

#myVideo{
  /* margin-top:15%; */
  /* margin-left: 15%; */
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

/* .video-container {
  position: relative;
} */

#qrcode {
    bottom: 0;
    object-fit: cover;
    pointer-events: none; 
    left:170vh;
    top: 5vh;
}

.overlay{
  position: fixed;
  top: 0;
  background: none;
  width: 100%;
}



</style> 






