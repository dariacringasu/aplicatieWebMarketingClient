<script setup>
import { RouterLink, RouterView } from "vue-router";


</script>

<template>
  
  <div class="wrapper">
   <suspense> 
      <RouterView/>
      <div>merge</div>
    </suspense>
  </div>
 
</template>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: #737477;
  font-size: 15px;
  font-family: "Roboto";
  font-weight: 400;
}
</style>
