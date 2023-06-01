import { createRouter, createWebHistory } from "vue-router";

import Register from "../views/RegisterView.vue";
import AddVideoView from "../views/AddVideoView.vue";
import LoginView from "../views/LoginView.vue";
import MainPage from "../views/MainPageView.vue";
import AllClients from "../views/AllClientsView.vue";
import VideoPlayer from "../views/VideoPlayerView.vue";
import PendingVideos from "../views/PendingVideosView.vue";
import UserProfile from "../views/UserProfileView.vue";

import Login from "../components/Login.vue";

import AddClient from "../components/AddClient.vue";
import OtherUserProfile from "../components/OtherUserProfile.vue";

import QrCodeGenerator from "../components/QrCodeGenerator.vue";



import { hasUserRole, UserRoles } from '@/components/utils/hasUserRole';
import ApprovedVideos from "../components/ApprovedVideos.vue";
import store from "../store";


import { handleLogout } from '@/components/utils/performLogout';
import performLogout from '@/components/utils/performLogout';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/mainpage",
        name: "mainpage",
        component: MainPage,
        params: { userId: Number }
      },
       {
         path: "/addClient",
       name: "addClient",
      component: AddClient
     },
     {
      path: "/addVideo",
      name: "addVideo",
      component: AddVideoView
     },
     {
      path:"/login",
      name:"login",
      component: LoginView
    },
    {
      path:"/videoplayer",
      name:"videoplayer",
      component: VideoPlayer
    },
    {
      path:"/register",
      name:"register",
      component: Register
    },
    {
      path:"/qr",
      name:"qr",
      component: QrCodeGenerator
    },
    {
      path:"/allclients",
      name:"allclients",
      component: AllClients
    },
    {
      path:"/userprofile",
      path:"/userprofile",
      name:"userprofile",
      component: UserProfile,
      // params: { userId: Number }
    },
    {
      path:"/pendingvideos",
      name:"pandingvideos",
      component: PendingVideos
    },
    {
      path:"/approvedvideos",
      name:"approvedvideos",
      component: ApprovedVideos
    },
    {
      path:"/otheruserprofile/:userId",
      name:"otheruserprofile",
      component: OtherUserProfile,
    }
    
    ]
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.role && !hasUserRole(to.meta.role)) {
    handleLogout();
    performLogout();
    next("/login");
  } else {
    next();
  }
});



export default router;