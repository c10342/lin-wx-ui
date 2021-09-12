<template>
  <section>

    <logs-item v-for="(item, index) in logsList" :key="index" :log="item" />
  </section>
</template>

<script>
import LogsItem from './logs-item.vue';
import logsList from './logs-list.js';
export default {
  components: {
    LogsItem
  },
  data() {
    return {
      logsList
    };
  }
};
</script>

