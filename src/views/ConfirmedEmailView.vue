<script setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import router from '../router';

const route = useRoute();
const email = route.query.email;
// console.log(email);

onMounted(() => {
  console.log(email)
  fetch("/api/client/confirmAccount/"+email , {
    method: 'POST'
  })
    .then(response => {
      // Handle the response as needed
      if (response.ok) {
        // Account confirmation successful
        console.log('Account confirmed');
      } else {
        // Account confirmation failed
        console.error('Account confirmation failed');
      }
    })
    .catch(error => {
      console.error('An error occurred during account confirmation:', error);
    });
});

function goLogin(){
    router.push("/");
}
</script>

<template>
    <div class="page">
       <h2> Your account has been verified!</h2>
       <button @click="goLogin">Login</button>
    </div>
</template>

<style scoped>
.page{
    color: black;
    height: 100%;
    width: 100%;
    /* background-color: burlywood; */
    background-image: url("src/components/icons/images/background.png");
    background-size: cover;
    align-items: center;
}
h2{
    margin-left: 40%;
    padding-top: 20px;
}
button{
    margin-left: 47%;
    margin-top: 10px;
    height: 45px;
    width: 100px;
    border: none;
    border-radius: 30px;
    color: black;
    font-size: 15px;
    background: rgba(255,255,255,0.5);
    outline: none;
}
</style>