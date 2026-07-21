<script lang="ts" setup>
import {onMounted, type PropType, ref, watch} from 'vue';
import {type UserType} from "@/api/users";
import Title from "@/components/Title.vue";
import {getUserTSStats} from "@/api/stats.ts";
import TermWindow from "@/components/termui/TermWindow.vue";

const props = defineProps({
  user: {
    type: Object as PropType<UserType>,
    required: true
  }
});

const tsStats = ref<Array<number>>([]);

async function updateStatistics() {
  let data = (await getUserTSStats(props.user?.username)).reverse();
  tsStats.value = data.map(stat => stat / Math.max(...data));
  let today = new Date().getDay() - 1;
  if (today < 0) today = 6;
  console.log(today);
  for (let i = 0; i < today; i++) {
    tsStats.value.unshift(-1);
  }
}

watch(props, () => {
  updateStatistics();
}, {deep: true});

onMounted(() => {
  updateStatistics();
});
</script>

<template>
  <main>
    <Title :text="'Информация о ' + user.username"/>
    <div class="info">
      <div>
        <span>Аккаунт Codeforces: <a :href="`https://codeforces.com/profile/${user.codeforcesHandle}`" target="_blank">{{ user.codeforcesHandle }}</a></span>
        <span>{{ user.lastName }} {{ user.firstName }}</span>
      </div>
      <slot/>
    </div>
    <div class="stats">
      <TermWindow>
        <template #header>
          Статистика
        </template>
        <div class="tsStatsScroll">
          <div class="tsStats">
            <template v-for="n in tsStats">
              <span v-if="n > 0" :style="`--n: ${n * 100}%; --m: ${(1 - n) * 100}%`" class="tsStat colored"/>
              <span v-else-if="n == 0" class="tsStat empty"/>
              <span v-else class="tsStat"/>
            </template>
          </div>
        </div>
      </TermWindow>
    </div>
  </main>
</template>

<style scoped>
* {
  font-family: "LXGW WenKai Mono TC", monospace;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 20px 20px;

  div {
    display: flex;
    flex-direction: column;

    & > * {
      margin-top: 10px;
      font-size: 20px;
    }
  }
}

.tsStatsScroll {
  overflow-x: auto;
}

.tsStats {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 82px;
  width: calc(min(634px, 90vw));
}

.stats {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tsStat {
  display: inline-block;
  width: 10px;
  height: 10px;

  &.colored {
    --color-a: #6bc46d;
    --color-b: #00630e;

    background-color: color-mix(in srgb, var(--color-a) var(--m), var(--color-b) var(--n));
  }

  &.empty {
    background-color: #2a313c;
  }
}
</style>