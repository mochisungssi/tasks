// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import myPlugin from "./plugins/globalPlugins";

const app = createApp(App);
app.use(router);
app.use(myPlugin);
app.mount("#app");
