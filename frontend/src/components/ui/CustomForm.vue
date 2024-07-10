<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CustomForm"
})
</script>

<template>
  <div>
    <Transition>
      <form :class="$style.form">
        <slot/>
      </form>
    </Transition>

  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
}
</style>

<style module>
.form {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: #9297FB solid 4px;
  border-radius: 20px;

  * {
    margin-bottom: 20px;
    font-family: "LXGW WenKai Mono TC", monospace;
    transition: all 0.5s;
  }

  *:last-child {
    margin-bottom: 0;
  }

  h2, h3, h4, h5, h6 {
    text-align: center;
    margin-top: 0;
  }
}
</style>