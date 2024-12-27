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
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

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
        border: "#9297FB",
        buttonBorder: "#9297FB",
        inputBorder: "#9297FB",
        fileInputBorder: "#9297FB"
    },
    light: {
        border: "#9297FB",
        buttonBorder: "#9297FB",
        inputBorder: "#9297FB",
        fileInputBorder: "#9297FB"
    }
}));
app.use(createManager());
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');