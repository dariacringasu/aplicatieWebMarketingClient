<script setup>
import SidebarNav from "../components/SidebarNav.vue";
import Register from "../components/Register.vue";
</script>

<template>
    <div class="page">
        
        <div class="content">
            <Register/>
        </div>
    </div>
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
    width: 100%;
    align-content: center;
}

</style>