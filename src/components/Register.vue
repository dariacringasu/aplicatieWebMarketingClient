<script setup>
import { ref } from 'vue';
import router from '@/router'


const email = ref("");
const companyName = ref("");
const password =ref("");
const confirmPassword = ref("");
const username = ref("");
const address = ref("");


function getCurrentDate() {
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


async function register() {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charster=utf8' 
    },
    body:  JSON.stringify({
      email: email.value,
      password: password.value,
      companyName: companyName.value,
      username: username.value,
      address: address.value,
      dateOfJoin: getCurrentDate()
    }),
  });
  if (response.status === 200) {
    router.push("/login")
  } else {
    console.log("Error");
  }
};
</script>

<template>
     <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<body>
<div class="box">
  <div class="container">
    <div>
      <header>Register</header>
    </div>

    <div class="input-field">
      <input type="text" placeholder="email" v-model="email" class="input" required> 
      <i class='bx bx-user'></i>
    </div>
    <div class="input-field">
      <input type="text" placeholder="company name" v-model="companyName" class="input" required> 
      <i class='bx bx-briefcase-alt'></i>
    </div>
    <div class="input-field">
      <input type="text" placeholder="username" v-model="username" class="input" required> 
      <i class='bx bx-face'></i>
    </div>
    <div class="input-field">
      <input type="text" placeholder="address" v-model="address" class="input" required> 
      <i class='bx bx-home-alt'></i>
    </div>
    <div class="input-field">
      <input type="text" placeholder="password" v-model="password" class="input" required> 
      <i class='bx bx-lock-alt'></i>
    </div>
    <div class="input-field">
      <input type="text" placeholder="confirm password" v-model="confirmPassword" class="input" required> 
      <i class='bx bx-lock-alt'></i>
    </div>
   
    <div class="input-field">
      <input type="submit" @click="register" value="Register" class="submit"> 
    </div>
 </div>
</div>
</body>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;800&display=swap');
*{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #111;
}
 body{
    background-image: url("src/components/icons/images/background.png");
    background-size: cover;
    background-position: center; 
    background-attachment: fixed;
    background-repeat: no-repeat;
    justify-content: center;
    /* background: none; */
    margin-left: -25%;
    
    
} 
 .box{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    margin-left: 20%;
}
.container{
    width: 350px;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 15px;    
}
span{
    /* color: #fff; */
    font-size: small;
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
}
header{
  /* color: #625D5D; */
    font-size: 30px;
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
}

.input-field .input{
    height: 45px;
    width: 87%;
    border: none;
    border-radius: 30px;
    color: #625D5D;
    opacity: 0.5;
    font-size: 15px;
    margin:5px;
    padding: 0 0 0 45px;
    background: rgba(255,255,255,0.1);
    outline: none;
}
i{
    position: relative;
    /* top: -30px; */
    left: -260px;
    color: #111;
}
::-webkit-input-placeholder{
  color: #625D5D;
}
.submit{
    border: none;
    border-radius: 30px;
    font-size: 15px;
    height: 45px;
    outline: none;
    margin-top: 2px; 
    width: 90%;
    color: #111;
    background: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: .3s ;
}
.submit:hover{
    box-shadow: 1px 5px 7px 1px #625D5D;
}

</style>