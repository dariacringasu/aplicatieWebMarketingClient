<script setup>
import SidebarNav from '../components/SidebarNav.vue';
import VideosStats from '../components/VideosStats.vue';
import { computed } from 'vue';
import store from "../store";


const userId = computed(() => store.getters.getCurrentUser.userId);

</script>

<template>
     <div class="page">
         <div class="navbar">
        <SidebarNav/>
        </div> 
        <div class="content">
           <VideosStats/>
        </div>
    </div>
</template>

<style scoped>
.page{
    height: 100%;
    width: 100%;
    background-color: burlywood;
    background-image: url("src/components/icons/images/background.png");
    background-size: cover;
    overflow-y: scroll;
}
.navbar{
    float:left;
    width:26%;
    height: 100%;
    background: none;

}
.content{
    float:right;
    width: 74%;
   
}
</style>