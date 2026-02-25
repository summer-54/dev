<template>
  <label class="terminal-wrapper">
    <span class="bracket bracket-left"></span>

    <span class="terminal-content">
      <span class="prompt">{{label}}</span>
      <input
          :type="password ? 'password' : 'text'"
          v-model="inputValue"
          class="terminal-input"
          :placeholder="placeholder"
      />
    </span>

    <span class="bracket bracket-right"></span>
  </label>
</template>

<script setup lang="ts">
const inputValue = defineModel({ type: String });

defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: String,
  password: {
    type: Boolean,
    required: false
  }
})
</script>

<style scoped>
.terminal-wrapper {
  display: flex;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  width: fit-content;
  gap: 10px;
  position: relative;
  cursor: text;
  font-size: 16px;
}

/* Графические скобки через border */
.bracket {
  width: 5px;
  height: 40px;
  border: 2px solid #95EAA7FF;
  opacity: 0.6;
  position: absolute;
  transition: all ease-in-out 0.2s;
}

.bracket-left {
  border-right: none;
  left: 0;
}

.bracket-right {
  border-left: none;
  right: 0;
}

.terminal-content {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 5px 10px;
  border: 1px solid #95EAA720;
  transition: all ease-in-out 0.2s;
}

.prompt {
  font-weight: bold;
  user-select: none;
  color: #95EAA7FF;
  text-shadow: 0 0 5px #95EAA7FF;
  transition: text-shadow ease-in-out 0.2s;
}

.terminal-input {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: 200px;
  padding: 0;
  caret-color: #95EAA7FF;
  caret-shape: block;
  margin: 0 0 0 8px;
}

@media (hover: hover) {
  .terminal-wrapper:hover {
    .prompt {
      text-shadow: 0 0 8px #95EAA7FF;
    }

    .bracket {
      height: 45px;
    }

    .bracket-left {
      left: -8px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    .bracket-right {
      right: -8px;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }

    .terminal-content {
      background: #95EAA710;
      border-color: #95EAA730;
      border-radius: 5px;
    }
  }
}

.terminal-wrapper:focus-within {
  .prompt {
    text-shadow: 0 0 8px #95EAA7FF;
  }

  .bracket {
    height: 45px;
  }

  .bracket-left {
    left: -8px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .bracket-right {
    right: -8px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .terminal-content {
    background: #95EAA710;
    border-color: #95EAA730;
    border-radius: 5px;
  }
}
</style>