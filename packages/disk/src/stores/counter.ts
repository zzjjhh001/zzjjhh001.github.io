import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const user = defineStore('user', () => {
  const isLoading = ref<boolean>(false);
  return {
    isLoading,
  }
})
export default user;
