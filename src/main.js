import { createApp } from "vue";
import App from "./App.vue";
import dayjs from "dayjs";
import "./index.css";

const app = createApp(App);
app.config.globalProperties.$dayjs = dayjs;
app.mount("#app");
