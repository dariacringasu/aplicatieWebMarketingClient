<script>
import { computed } from '@vue/reactivity';
import store from "../store";
import axios from 'axios';
import { ref } from 'vue';


export default {
  data(){
    return {
      fileSelected: false,
      urlvideo: null
    }
  },
  methods: {
    async uploadVideo() {
      const userId = computed(() => store.getters.getCurrentUser.userId);

      const description = this.$refs.description;
      const urlmoreinfo = this.$refs.urlmoreinfo;
      const title = this.$refs.title;
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('image', file);
      try {
        const response1 = await axios.post('/api/image/addFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const response2 = await fetch("/api/video/add/"+userId.value,{
          method: "POST",
    headers: {
        'Content-Type': 'application/json; charster=utf8'
    },
    body:  JSON.stringify({
      description: description.value,
      urlmoreinfo: urlmoreinfo.value,
      title: title.value,
      dateOfPosting: this.getCurrentDate()
    }),
        });

        if(response2.ok){
          alert("Video uploaded successfully!");
        }
        else {
      throw new Error('Failed to upload video.');
    }

      } catch (error) {
        console.error("eroare",error);
      }
    },
    fileChange(event){
      console.log(event);
      const video = event.target.files[0];
      // const urlvideo = URL.createObjectURL(video);
      this.urlvideo = URL.createObjectURL(video);
      // document.querySelector('video').setAttribute('src',urlvideo);
      this.fileSelected = event.target.files.length > 0;
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
}
  }
     
    
};






</script>


<template>
  <body>
    <div class="box">
      <div class="container">
        <form id="form" @submit.prevent="uploadVideo">
          <div class="input-field">
            <label for="title"><b>Title</b></label>
            <input class="input" ref="title">
          </div>
          <div class="input-field">
            <label for="description"><b>Description</b></label>
            <input class="input" ref="description">
          </div>
          <div class="input-field">
            <label for="urlmoreinfo">Url More Info</label>
            <input class="input" ref="urlmoreinfo">
          </div>
          <div>
            <input class="input-file" type="file" id="videoFile" ref="fileInput" accept="video/*" @change="fileChange">
          </div>
          <div class="input-field">
            <input type="submit" value="Add" class="submit">
          </div>
        </form>

        <div v-if="fileSelected" class="video-player">
          <video width="320" height="240" autoplay="autoplay" controls>
            <source :src="urlvideo" type="video/mp4">
            <source :src="urlvideo" type="video/ogg">
          </video>
        </div>
      </div>
    </div>
  </body>
</template>


<style scoped>
*{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #111;
}
body{
    /* background-image: url("src/components/icons/images/background.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed; 
    background-repeat: no-repeat;*/
    justify-content: center;
    background: none;
    margin-left: -25%;

    
}
 .box{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
}
input {
  width: 20%;
  padding: 15px;
  margin: 5px 0 10px 50px;
  display: list-item;
  border: none;
  background: #f1f1f1;
}
.input-field .input{
    height: 45px;
    width: 87%;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 15px;
    margin:5px;
    padding: 0 0 0 45px;
    background: rgba(255,255,255,0.1);
    outline: none;
}

/* .input-field  */
.input-file{
  content: 'Select some files';
  height: 45px;
  width: 87%;
  display: inline-block;
  background:none;
  /* background: rgba(255,255,255,0.1); */
  border: none;
  /* border-radius: 30px; */
  padding-left: 10px;
  margin: 5px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  /* text-shadow: 1px 1px #fff; */
}
.submit{
  border: none;
    border-radius: 30px;
    font-size: 15px;
    height: 45px;
    outline: none;
    /* margin-top: 2px;  */
    margin-left: 0;
    width: 90%;
    color: #111;
    background: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: .3s ;
    
}

.submit:hover{
    box-shadow: 1px 5px 7px 1px #625D5D;
}

.video-player{
  /* display: none; */
  width: 50%;
  height: 60%
}

.video-player video{
  height: auto; 
  display: block;
}
</style>