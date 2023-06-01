<script setup>
import { ref } from "vue";
import router from '../router';
import store from "../store";
import { computed } from "@vue/reactivity";

const companyName = computed(() => store.getters.getCurrentUser.companyName);
console.log(companyName.value)

const email = ref("");
const password = ref("");


const currentType = ref('password');

const isEmailOrPasswordValid = ref("");

async function login() {
  const response = await fetch("/api/auth/authenticate", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charster=utf8' 
    },
    body:  JSON.stringify({
      email: email.value,
      password: password.value
    }),
  });
  if (response.status === 200) {
     const currentUser = await response.json();
     store.commit("setCurrentUser", currentUser);
     store.commit("setIsAuthenticated", true);
     router.push("/mainpage");
  } else {
    isEmailOrPasswordValid.value = "Invalid email or password. Try again.";
  }
}

function seePassword() {
  if (currentType.value === 'password') {
    currentType.value = 'text';
  } else {
    currentType.value = 'password';
  }
}

function goToRegister(){
  router.push("/register");
}

</script>

<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<body>
<div class="box">
  <div class="container">
    <div>
      <span>Have an account?</span>
      <header>Login</header>
    </div>

    <div class="input-field">
      <input type="text" placeholder="email" v-model="email" class="input" required> 
      <i class='bx bx-user'></i>
    </div>
    <!-- <div class="input-field">
      <input type="text" placeholder="password" v-model="password" class="input" :type="currentType" required> 
      <i class='bx bx-lock-alt'></i>
      <div id="eye" >
      
          <i @click="seePassword" class='bx bx-low-vision'></i>
     
      </div>
    </div> -->

    <div class="input-field">
    <input placeholder="password" v-model="password" :type="currentType" class="input" required> 
    <i class='bx bx-lock-alt'></i>
    <div id="eye">
      <i @click="seePassword" class='bx' :class="currentType === 'password' ? 'bx-low-vision' : 'bx-show-alt'"></i>
    </div>
  </div>

    <div class="position">
          <span class="red"> {{ isEmailOrPasswordValid }}</span>
        </div>

    <div class="input-field">
      <input type="submit" @click="login" value="Login" class="submit"> 
    </div>

    <div class="two-col">
            <!-- <div class="one">
               <input type="checkbox" name="" id="check">
               <label for="check"> Remember Me</label>
            </div> -->
            <div class="one">
                <label><a style="color: #111" @click="goToRegister">Don't have an account? Sign up.</a></label>
            </div>
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


#eye {
  position: absolute;
  left: 160%;
  top:30%;
  bottom: 0;
  cursor: pointer;
  /* height: 200px; */
} 

.position {
  text-align: center;
  margin:auto;
  margin-left: 12%;
}
.red {
  color: rgb(239, 9, 9);
}

body{
    background-image: url("src/components/icons/images/background.png");
    background-size: cover;
    /* background-position: center; */
    background-attachment: fixed;
    background-repeat: no-repeat;
    justify-content: center;   
}

 .box{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
}
.container{
    width: 350px;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 15px;
}
span{
  color: #111;
    font-size: small;
    display: flex;
    justify-content: center;
    padding: 10px 0 10px 0;
}
header{
  color: #111;
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
    color: black;
    background: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: .3s ;
}
.submit:hover{
    box-shadow: 1px 5px 7px 1px #625D5D;
}
.two-col{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* color: #625D5D; */
    font-size: small;
    margin-top: 10px;
}
.one{
    display: flex;
    margin-left: 18%;
}
label a{
    text-decoration: none;
    color: #fff;
} 



</style>