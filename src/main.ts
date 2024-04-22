import { createApp } from "vue";
import "./index.css";
import VueKonva from "vue-konva";
import App from "./App.vue";
import router from "@/routers";
import Vue3Lottie from "vue3-lottie";

const app = createApp(App);

app.use(VueKonva);
app.use(router);
app.use(Vue3Lottie);
app.mount("#app");
