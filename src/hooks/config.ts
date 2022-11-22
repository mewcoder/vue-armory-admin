import { reactive } from 'vue';

const config = reactive({
  watermark: false
});

export function useConfig() {
  return config;
}
