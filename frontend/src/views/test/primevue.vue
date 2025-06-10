<template>
  <div class="card">
    <!-- @vue-skip -->
    <MegaMenu :model="items" :class="$style.megaMenu" style="border-radius: 3rem">
      <template #start>
        <h4>Информатика в <a href="https://moscowschool54.ru/" target="_blank">школе №54</a></h4>
      </template>
      <template #item="{ item }">
        <NavButton v-if="item.root && 'to' in item" :icon="item.image" :to="item.to" class="desktop">
          {{ item.label }}
        </NavButton>
        <IconButton v-else-if="item.root" alt="" :icon="item.image">
          {{ item.label }}
        </IconButton>
        <div v-else class="flex flex-col items-start gap-4 p-2">
          <Button outlined>
            <ThemeInvertSvg alt="megamenu-demo" :src="item.image"/>
            {{item.label}}
          </Button>
        </div>
      </template>
    </MegaMenu>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Avatar, Button, MegaMenu} from "primevue";
import homeIcon from "@/assets/home.svg";
import cupIcon from "@/assets/cup.svg";
import olympIcon from "@/assets/olymp.svg";
import campIcon from "@/assets/camp.svg";
import NavButton from "@/components/ui/navButton.vue";
import ThemeInvertSvg from "@/components/ui/ThemeInvertSvg.vue";
import IconButton from "@/components/ui/iconButton.vue";

export default defineComponent({
  name: "PrimevueHeader",
  components: {IconButton, ThemeInvertSvg, NavButton, MegaMenu, Button, Avatar},
  data() {
    return {
      items: [
        {
          label: 'Информация',
          root: true,
          image: homeIcon,
          items: [
            [
              {
                label: "",
                items: [
                  {
                    label: 'Олимпиада',
                    image: olympIcon,
                    to: "/olymp"
                  },
                  {
                    label: 'Летний кубок',
                    image: cupIcon
                  },
                  {
                    label: 'ЛШП',
                    image: campIcon
                  }
                ]
              }
            ]
          ]
        }
      ]
    };
  }
});
</script>

<style scoped>
.desktop {

}
</style>

<style module>
.megaMenu ul {
  overflow: unset !important;
}
</style>