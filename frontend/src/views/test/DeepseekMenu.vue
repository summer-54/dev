<template>
  <div class="center-align">
    <div class="nav-menu">
      <ul class="menu-list">
        <li v-for="item in menuItems" :key="item.name">
          <div 
            class="menu-item-wrapper"
            @mouseover="item.hasDropdown ? toggleDropdown(item.name, true) : null"
            @mouseleave="item.hasDropdown ? toggleDropdown(item.name, false) : null"
          >
            <RouterLink v-if="item.link" :to="item.link" class="menu-item"><ThemeInvertSvg v-if="item.icon" alt="icon" inverted :src="item.icon"/>{{ item.name }}</RouterLink>
            <span v-else class="menu-item"><ThemeInvertSvg v-if="item.icon" alt="icon" inverted :src="item.icon"/>{{ item.name }}</span>
            <ul v-if="item.hasDropdown" class="dropdown-menu" :class="{ show: isOpen[item.name] }">
              <li v-for="subItem in item.items" :key="subItem">
                <RouterLink :to="subItem.to" class="dropdown-item">{{ subItem.name }}</RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import newsIcon from '@/assets/news2.svg';
import contestIcon from '@/assets/cup.svg';
import accountIcon from '@/assets/account.svg';
import ThemeInvertSvg from '@/components/ui/ThemeInvertSvg.vue';

export default defineComponent({
  name: "DeepseekMenu",
  data() {
    return {
      isOpen: {
        News: false,
        Contests: false,
      },
      menuItems: [
        { 
          name: 'Новости',
          link: '/',
          icon: newsIcon,
          hasDropdown: true,
          items: [{name: 'Статьи', to: '/'}]
        },
        { 
          name: 'Соревнования',
          icon: contestIcon,
          hasDropdown: true,
          items: [
            {name: 'Олимпиада', to: '/olymp'},
            {name: 'Летний кубок', to: '/summer-cup'},
            {name: 'ЛШП', to: '/summer-camp'}
          ]
        },
        { 
          name: 'Аккакунт',
          icon: accountIcon,
          link: '/me',
          hasDropdown: false,
          items: []
        }
      ]
    }
  },
  methods: {
    toggleDropdown(menu, show) {
      this.isOpen[menu] = show;
    }
  },
  computed: {
    buttonBg() {
      return (this.$themeName === "dark" ? "#f8f9fa" : "#292521");
    },
    buttonColor() {
      return (this.$themeName === "dark" ? "#333" : "white");
    },
    dropdownColor() {
      return (this.$themeName === "dark" ? "white" : "black");
    },
    buttonHoverColor() {
      return (this.$themeName === "dark" ? "#e9ecef" : "#2d2d2d");
    }
  },
  components: {ThemeInvertSvg}
});
</script>

<style>
.nav-menu {
  font-family: Arial, sans-serif;
  position: relative;
  display: inline-block;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 20px;
}

.menu-list > li {
  position: relative;
}

.menu-item-wrapper {
  position: relative;
  padding-bottom: 10px; /* Creates overlap area for smooth transition */
}

.menu-item {
  padding: 10px 15px;
  text-decoration: none;
  color: v-bind(buttonColor);
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: v-bind(buttonBg);
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: v-bind(buttonHoverColor);
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% - 10px); /* Overlaps with parent's padding-bottom */
  left: 0;
  background-color: v-bind(dropdownColor);
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  color: v-bind(buttonColor);
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: v-bind(buttonBg);
}

.center-align {
  display: flex;
  justify-content: space-around;
}
</style>