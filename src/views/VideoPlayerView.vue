<script setup>
import videoplayer from '../components/Player Video/VideoPlayer.vue';
import SidebarNav from '../components/SidebarNav.vue';
</script>

<template>
     <!-- <div class="page">
        <div class="navbar">
            <SidebarNav/>
        </div>
        <div class="content"> -->
            <videoplayer/>
        <!-- </div>
    </div> -->
</template>

<style scoped>
.page{
    height: 100%;
    width: 100%;
    /* background-color: burlywood; */
    background-image: url("src/components/icons/images/background.png");
    background-size: cover;
}
.navbar{
    float:left;
    width:26%;
    height: 100%;

}
.content{
    float:right;
    width: 74%;
    align-content: center;
}
</style>