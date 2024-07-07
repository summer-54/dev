import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createVueSui} from "sffui.vue"

const app = createApp(App);

app.use(router);
app.use(createVueSui());

app.mount('#app');