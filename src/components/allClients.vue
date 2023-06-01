<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import UserSimpleDetails from "../components/user/userDetails.vue";
import router from '../router';

const currentPageIndex = ref(1);



const response = await fetch("/api/client/paged/basicDetails?page=" + (currentPageIndex.value - 1) + "&numberOfUsersPerPage=" + 9);
const tempUsers = ref(await response.json());
const users = ref([...tempUsers.value.content]);

const searchTerm = ref('');

const numberOfUsers = tempUsers.value.totalElements;
const firstPage = 1;
const lastPage = tempUsers.value.totalPages;

const deleteUser = async (userId) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      const response = await fetch("/api/client/deleteUser/" + userId, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully.`);
        // await fetchClientsBasicDetails(); // Refresh the list of users
      } else {
        throw new Error('Failed to delete user.');
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }
};

// fetchClientsBasicDetails();

function redirectToUserPage(userId) {
    router.push({ name: 'otheruserprofile', params: { userId } });
    // console.log("redirecting to user page");
}

let arrayOfPageIndexes = Array.from({ length: numberOfUsers / 9 + 1 }, (x, i) => i + 1);

function checkIfCurrentPage(pageIndex) {
    if (currentPageIndex.value === pageIndex) {
        return "#7F8C8D ";
    }
    else {
        return "black";
    }
}

function toggleHighlightingOfPageIndex(pageIndex) {
    let popup = document.getElementById("index-" + pageIndex);
    popup.classList.toggle("current-page-highlighter");
};

async function getPageWithPageIndex(pageIndex) {
    toggleHighlightingOfPageIndex(currentPageIndex.value);
    currentPageIndex.value = pageIndex;
    toggleHighlightingOfPageIndex(currentPageIndex.value);

    const newResponse = await fetch("/api/client/paged/basicDetails?page=" + (currentPageIndex.value - 1) + "&numberOfUsersPerPage=" + 9);
    const newTempUsers = await newResponse.json();
    users.value = [...newTempUsers.content];
}


const isCurrentPageFirstPage = computed(() => {
    return currentPageIndex.value == firstPage ? true : false;
});

const isCurrentPageLastPage = computed(() => {
    return currentPageIndex.value == lastPage ? true : false;
});

// nou filtered users

const filteredUsers = computed(() => {
  if (searchTerm.value === '') {
    return users.value;
  } else {
    const regex = new RegExp(searchTerm.value, 'i');
    return users.value.filter(user => regex.test(user.companyName) || regex.test(user.email));
  }
});

function searchUsers() {
  // Trigger search when the input changes
  getPageWithPageIndex(currentPageIndex.value);
}


</script>

<template>


                <div id="content">
                    <div>
                        <h1>All Users</h1>
                        <input id="inputSearch" v-model="searchTerm" type="text" placeholder="Search by company name or email" @input="searchUsers">
                    </div>
                    <div id="user-list">
                        
                        <!-- <div v-for="user in users" class="temp"> -->
                            <div v-for="user in filteredUsers" class="temp" :key="user.id">
                            <UserSimpleDetails  class="user"
                            :companyName="user.companyName" :email="user.email"  :id="user.id"
                            cursor="pointer" @click="redirectToUserPage(user.id)" />
                           
                            <button @click="deleteUser(user.id)">Delete</button>
                        </div>
                        
                    </div>

<!-- <div id="page-indexes-container">                      -->


</div>
<div id="page-indexes-container">
<div id="page-indexes-container--align-center">
    
    <div v-for="pageIndex in arrayOfPageIndexes" class="index-container"
        :id="'index-' + pageIndex" :style="{ 'color': checkIfCurrentPage(pageIndex) }"
        @click="getPageWithPageIndex(pageIndex)">
        {{ pageIndex }}
    </div>
    
</div>
</div>
<!-- </div> -->


</template>

<style scoped>


#content {
display: grid;
grid-template-rows: 10% 70% 10%;
margin-left: -10%;
height: 100%;
/* margin-left: -120%; */
}

#inputSearch{
  margin:1%;
  opacity: 0.5;
  background: rgba(255,255,255,0.1);
  color: #111;
  height: 25px;
  width: 230px;
}

h1 {
color: #111;
margin-bottom: 3%;
margin-top: 2%;
}

#user-list {
display: flex;
flex-direction: row;
flex-wrap: wrap;
align-content: stretch;
row-gap: 15px;
margin-top: 10%;
height: 15%;
position: relative;
margin-bottom: 10px;
}

.user {
margin-right: 2%;
margin-bottom: 2%;
width: 320px;
transition: all .2s ease-in-out;
color: #625D5D;
}

.user:hover {
transform: scale(1.1);
}

button{
  background-color: rgba(255,255,255,0.1);
  border-color: #625D5D;
  margin: 1%;
  padding: 1%;
  border-radius: 8px;
}

button:hover{
  transform: scale(1.1);
}


#page-indexes-container {
height: max-content;
width: 100%;
font-size: 1.5rem;
display: grid;
grid-template-columns: 45% max-content 45%;
/* margin-top: 5%; */
bottom: 0;

display: flex;
  align-items: center;
  justify-content: center;
}

#page-indexes-container--align-center {
width: max-content;
text-align: center;
display: flex;
justify-content: center;
margin-left: -50%;
}

.index-container {
cursor: pointer;
display: flex;
align-items: center;
padding: 0.375rem 0.55rem;
align-items: center;
justify-content: center
}


.material-symbols-outlined {
display: flex;
align-items: center;
padding: 0.375rem 0.75rem;
font-size: 1.6rem;
font-weight: 1000;
line-height: 1.0;
text-align: center;
white-space: nowrap;
cursor: pointer;
}

.current-page-highlighter {
color: #111;

}

#previous-pages-options-container span{
float: right;
}

#next-pages-options-container span {
float: left;
}

</style>