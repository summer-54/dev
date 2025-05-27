<script setup lang="ts">

</script>

<template>
  <ul :class="[$style.List, $style.one]">
    <li :style="{ gridRow: 'span 3' }">
      <slot name="primary"/>
    </li>

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
}
@media only screen and (min-width: 600px) {
  .List.one {
    width: 500px;
    grid-template-columns: 0.75fr 1fr;
  }
  .List.two {
    width: 600px;
    grid-auto-flow: column;
    grid-template-rows: repeat(3, 1fr);
  }
  .List.three {
    grid-auto-flow: column;
    grid-template-rows: repeat(3, 1fr);
  }
}
</style>