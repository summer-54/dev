import {computed} from "vue";
import {themeName} from "@/utils.js";

export const colors = computed(() => {
    return themeName.value === "dark" ? {
        bg: "#2c2c2c",
        hoverColor: "#9297FB",
        itemHeadingColor: "#9297FB",
        itemHeadingHoverColor: "black",
        itemTextColor: "white",
        itemTextHoverColor: "black"
    } : {
        bg: "#d6d6fb",
        hoverColor: "#9297FB",
        itemHeadingColor: "#7b81ff",
        itemHeadingHoverColor: "black",
        itemTextColor: "black",
        itemTextHoverColor: "black"
    }
});