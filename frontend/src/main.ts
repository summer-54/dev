import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createVueSui} from "sffui.vue";
import {createManager} from '@vue-youtube/core';

const app = createApp(App);

app.use(router);
app.use(createVueSui());
app.use(createManager());

app.mount('#app');