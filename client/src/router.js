import { createRouter, createWebHistory } from "vue-router";
import Home from "./App.vue";

// Define route components
const routes = [{ path: "/", component: Home }];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
