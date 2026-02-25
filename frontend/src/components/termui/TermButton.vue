<template>
  <button class="terminal-wrapper">
    <span class="bracket bracket-left"></span>

    <span class="terminal-content">
      <slot/>
    </span>

    <span class="bracket bracket-right"></span>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped>
.terminal-wrapper {
  background: none;
  border: none;
  outline: none;
  padding: 0;

  display: flex;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  width: fit-content;
  gap: 10px;
  position: relative;
  cursor: pointer;
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
  font-size: 16px;
  transition: all ease-in-out 0.2s;
  text-shadow: 0 0 5px #95EAA7FF;
  color: #95EAA7FF;
}

@media (hover: hover) {
  .terminal-wrapper:hover {
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
      text-shadow: 0 0 8px #95EAA7FF;
    }
  }
}

.terminal-wrapper:focus-visible {
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
    text-shadow: 0 0 8px #95EAA7FF;
  }
}

.terminal-wrapper:active {
  .bracket {
    transition-duration: 0.02s;
  }

  .bracket-left {
    left: -5px;
  }

  .bracket-right {
    right: -5px;
  }

  .terminal-content {
    background: #95EAA710;
    border-color: #95EAA730;
    border-radius: 5px;
    text-shadow: 0 0 10px #95EAA7FF, 0 0 15px #95EAA7FF;
    transition-duration: 0.02s;
  }
}
</style>