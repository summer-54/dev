import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {createVueSui} from "sffui.vue";
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
app.use(createVueSui({
    dark: {
        buttonBorder: "#9297FB",
        inputBorder: "#9297FB"
    },
    light: {
        buttonBorder: "#9297FB",
        inputBorder: "#9297FB"
    }
}));
app.use(createManager());

app.mount('#app');