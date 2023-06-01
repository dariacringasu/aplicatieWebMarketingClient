import { computed } from "@vue/reactivity";
import router from "../../router";
import store from "../../store";

export default function performLogout() {
  const intervalName = computed(
    () => JSON.parse(localStorage.getItem("store")).authStore.getIntervalName
  );
  if (intervalName) {
    clearInterval(intervalName);
  }
  store.commit("setIsAuthenticated", false);
  store.commit("clearCurrentUser");

}

export async function handleLogout() {
  await fetch("/api/auth/logout", {
    // credentials: "include",
    method: "POST",
  }).then((response) => {
    if (response.status === 200) {
      performLogout();
      console.log("logout handle");
      router.push({ path: "/login" });
    } else {
      console.log("Something went wrong");
      performLogout();
    }
  });
}