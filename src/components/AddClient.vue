<script setup>

import { ref } from "vue";

const email = ref("");
const companyName = ref("");
const password = ref("");
const username = ref("");

// async function addClient(){
//     const response = await fetch("/api/client/add",{
//         method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
//     },
//     body: JSON.stringify({
//         "companyName":"companyName.value",
//         "password":"password.value"}),
//     });

//     if(response.status ===200){
//         console.log("User adaugat cu succes!");
//     }
//     else {
//         console.log("Eroare!");
//     }
// }

async function addClient() {
      const response = await fetch("/api/auth/register",
  {
    method:"POST",
    headers: {
      'Content-Type': 'application/json; charster=utf8'
    },
    body: JSON.stringify(
      {
      companyName: companyName.value,
      password: password.value,
      email: email.value,
      username: username.value
      }
    )
  }
  );
  if(response.status ===200){
        console.log("User adaugat cu succes!");
    }
    else {
        console.log("Eroare!");
    }
}
</script>

<template>
    <div>
    
      <label for="companyName"><b>Company Name</b></label>
      <input place-holder="Company Name" v-model="companyName">
     
      <label for="email"><b>Email</b></label> 
      <input place-holder="email" v-model="email">  

      <label for="username"><b>Username</b></label> 
      <input place-holder="username" v-model="username">
      
      <label for="password"><b>Password</b></label>
      <input place-holder="password" v-model="password">

      <button @click="addClient">ADD</button>
    </div>
 
</template>

<style scoped>
input {
  width: 20%;
  padding: 15px;
  margin: 5px 0 10px 50px;
  display: list-item;
  border: none;
  background: #f1f1f1;
}
</style>