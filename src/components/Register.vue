<script setup>
import { ref, reactive, computed} from 'vue';
import router from '@/router'



const email = ref("");
const companyName = ref("");
const password =ref("");
const confirmPassword = ref("");
const username = ref("");
const address = ref("");

const isEmailNull = ref("");
const isCompanyNameNull = ref("");
const isPasswordNull = ref("");
const isUsernameNull = ref("");
const isAddressNull = ref("");
const isConfirmPasswordNull = ref("");
const isConfirmPasswordCorrect = ref("");


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
  if (email.value.trim() === '' || companyName.value.trim() === '' || username.value.trim() === '' || address.value.trim() === '' || password.value.trim() === '' ||confirmPassword.value.trim() === '') {
    if(email.value.trim() === ''){
      isEmailNull.value = "Email is required";
    }
     else {
      isEmailNull.value = "";
    }
    if (companyName.value.trim() === '') {
      isCompanyNameNull.value = "Company name is required";
    }
    else{
      isCompanyNameNull.value = "";
    }
    if (username.value.trim() === '') {
    isUsernameNull.value  = "Username is required";
  }
  else{
    isUsernameNull.value = "";
  }
  if (address.value.trim() === '') {
    isAddressNull.value = "Address is required";
  }
  else{
    isAddressNull.value = "";
  }
  if (password.value.trim() === '') {
    isPasswordNull.value = "Password is required";
  }
  else{
    isPasswordNull.value = "";
  }
  
  if (confirmPassword.value.trim() === '') {
    isConfirmPasswordNull.value = "Confirm password is required";
  }
  else{
    isConfirmPasswordNull.value = "";
  }
    return;
  }

  if(confirmPassword.value !== password.value){
    isConfirmPasswordCorrect.value = "Confirm password is incorrect";
    return;
  } 
  else{
    isConfirmPasswordCorrect.value = "";
  }

  
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
    if(confirm("Registration successful! We have sent a confirmation link to your email.")){
      router.push("/login")
    }
  } else {
    console.log("Error");
  }
};

const currentType = ref('password');

function seePassword() {
  if (currentType.value === 'password') {
    currentType.value = 'text';
  } else {
    currentType.value = 'password';
  }
}


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
      <input type="text" placeholder="email" v-model="email" id="email"
      class="input" required> 
      <i class='bx bx-user'></i>
    </div>
    <!-- <span v-if="!reactiveData.isEmailValid">Invalid email format</span> -->


    <div class="input-field">
      <input type="text" placeholder="company name" v-model="companyName" id="companyName" class="input" required> 
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
    <input placeholder="password" v-model="password" :type="currentType" class="input" required> 
    <i class='bx bx-lock-alt'></i>
    <div id="eye">
      <i @click="seePassword" class='bx' :class="currentType === 'password' ? 'bx-low-vision' : 'bx-show-alt'"></i>
    </div>
  </div>
    <div class="input-field">
      <input type="password" placeholder="confirm password"
      v-model="confirmPassword" class="input" required> 
      <i class='bx bx-lock-alt'></i>
    </div>
   
    <div class="input-field">
      <input type="submit" @click="register" value="Register" class="submit"> 
    </div>

    <div class="errors">
      <i v-if="isEmailNull || isCompanyNameNull || isUsernameNull || isAddressNull || isPasswordNull || isConfirmPasswordNull || isConfirmPasswordCorrect" class='bx bx-message-rounded-error'></i>
      <p v-if="isEmailNull">{{ isEmailNull }}</p> 
      <p v-if="isCompanyNameNull"> {{ isCompanyNameNull }}</p>
      <p v-if="isUsernameNull"> {{ isUsernameNull }}</p>
      <p v-if="isAddressNull"> {{ isAddressNull }}</p>
      <p v-if="isPasswordNull">{{ isPasswordNull }}</p>
      <p v-if="isConfirmPasswordNull">{{isConfirmPasswordNull}}</p>
      <p v-if="isConfirmPasswordCorrect">{{ isConfirmPasswordCorrect }}</p>
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
#eye {
  position: absolute;
  left: 160%;
  top:30%;
  bottom: 0;
  cursor: pointer;
  /* height: 200px; */
} 
.errors {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100px;
  width: 87%;
  margin:5px;
  }

  .errors p {
    font-size: 14px;
    color: #111;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .errors  i {
    height: 50px;
    margin-left: 520px;
    display: flex;
    align-items: center;
    justify-content: center;
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