import type {Directive} from "vue";

export default <Directive<{focus: () => void}, boolean>>{
    mounted(elem, {value}) {
        if (value) elem.focus();
    },
    updated(elem, {value}) {
        if (value) elem.focus();
    }
}