<template>
  <div class="nav-menu">
    <ul class="menu-list">
      <li 
        v-for="item in menuItems" 
        :key="item.name"
        @mouseover="item.hasDropdown ? toggleDropdown(item.name, true) : null"
        @mouseleave="item.hasDropdown ? toggleDropdown(item.name, false) : null"
      >
        <a href="#" class="menu-item">{{ item.name }}</a>
        <ul v-if="item.hasDropdown" class="dropdown-menu" :class="{ show: isOpen[item.name] }">
          <li v-for="subItem in item.items" :key="subItem">
            <a href="#" class="dropdown-item">{{ subItem }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: {
        News: false,
        Contests: false,
        Account: false
      },
      menuItems: [
        { 
          name: 'News', 
          hasDropdown: true,
          items: ['Articles']
        },
        { 
          name: 'Contests', 
          hasDropdown: true,
          items: ['Olympiad', 'Summer Cup', 'Summer Camp']
        },
        { 
          name: 'Account', 
          hasDropdown: false,
          items: []
        }
      ]
    }
  },
  methods: {
    toggleDropdown(menu, show) {
      this.isOpen[menu] = show;
    },
    closeDropdown(menu) {
      this.isOpen[menu] = false;
    }
  }
}
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

.menu-item {
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  display: block;
  background-color: #f8f9fa;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #e9ecef;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
  margin-top: 5px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  color: #333;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}
</style>