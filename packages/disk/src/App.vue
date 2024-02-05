<script setup lang="ts">
import { RouterView } from 'vue-router';
import user from '@/stores/counter';
import { Spin } from 'ant-design-vue';
const store = user();
</script>

<template>
  <div>
    <div v-show="store.isLoading" class="loading">
      <Spin size="large"></Spin>
    </div>
    <RouterView />
  </div>
</template>
<style>
body {
  background-color: #fff;
  color: #000;
}
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>