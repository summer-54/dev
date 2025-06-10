<script setup lang="ts">

</script>

<template>
  <ul :class="[$style.List]">
    <slot/>
  </ul>
</template>

<style module>
.List {
  display: grid;
  padding: 22px;
  margin: 0;
  column-gap: 10px;
  list-style: none;
  width: 500px;
}
</style>