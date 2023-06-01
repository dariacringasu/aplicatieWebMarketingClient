
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
      window.fetch('/api/video/getAll')
        .then(response2 => response2.json())
        .then(videosurls => {
          window.fetch('src/videos/names.json')
            .then(response => response.json())
            .then(videoFiles => {
              var videoPath = "src/videos/";
              currentVideoIndex = 0;
               var videoSource = document.getElementById("videoSource");
              videoSource.src = videoPath + videoFiles[currentVideoIndex];
              var qrcode = document.getElementById("qrcode");
              this.qrcodeValue = videosurls[currentVideoIndex].urlmoreInfo;
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
                if (currentVideoIndex < videoFiles.length) {
                  videoSource.src = videoPath + videoFiles[currentVideoIndex];
                  myVideo.load();
                  this.qrcodeValue = videosurls[currentVideoIndex].urlmoreInfo;
                  myVideo.play();
                }
              });

            });
        })
        .catch(error => console.error(error));
    });


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
    <qrcode-vue id="qrcode" :value="qrcodeValue" />
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






