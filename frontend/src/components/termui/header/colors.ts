import {computed} from "vue";
import {useColorMode} from "@vueuse/core";

const dark = useColorMode({initialValue: "dark"});

export const colors = computed(() => {
    return dark.value === "dark" ? {
        bg: "#2c2c2c",
        hoverColor: "#9297FB",
        itemHeadingColor: "#9297FB",
        itemHeadingHoverColor: "black",
        itemTextColor: "white",
        itemTextHoverColor: "black",
        primaryColor: "#95EAA7FF",
        filterString: "brightness(0) saturate(100%) invert(86%) sepia(32%) saturate(478%) hue-rotate(71deg) brightness(99%) contrast(85%)"
    } : {
        bg: "#d6d6fb",
        hoverColor: "#9297FB",
        itemHeadingColor: "#7b81ff",
        itemHeadingHoverColor: "black",
        itemTextColor: "black",
        itemTextHoverColor: "black",
        primaryColor: "#1e8630",
        filterString: "brightness(0) saturate(100%) invert(38%) sepia(64%) saturate(615%) hue-rotate(79deg) brightness(92%) contrast(86%)"
    }
});