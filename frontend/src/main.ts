import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createManager} from '@vue-youtube/core';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title as ChartJSTitle,
    Tooltip
} from "chart.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartJSTitle,
    Tooltip,
    Legend
);

const app = createApp(App);

app.use(router);
// app.use(createVueSui({
//     dark: {
//         border: "#9297FB",
//         buttonBorder: "#9297FB",
//         inputBorder: "#9297FB",
//         fileInputBorder: "#9297FB"
//     },
//     light: {
//         border: "#9297FB",
//         buttonBorder: "#9297FB",
//         inputBorder: "#9297FB",
//         fileInputBorder: "#9297FB"
//     }
// }, {default: "dark"}));
app.use(createManager());
app.use(ElementPlus);

app.mount('#app');