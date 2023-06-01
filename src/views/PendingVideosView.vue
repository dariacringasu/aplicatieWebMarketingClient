<script setup>
import PendingVideos from '../components/PendingVideos.vue';
import SidebarNav from '../components/SidebarNav.vue';

</script>

<template>
     <div class="page">
         <div class="navbar">
        <SidebarNav/>
        </div> 
        <div class="content">
            <PendingVideos/>
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