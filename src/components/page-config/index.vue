<template>
  <el-drawer
    :model-value="modelValue"
    direction="rtl"
    append-to-body
    :before-close="handleClose"
  >
    <template #header>
      <h4>全局配置</h4>
    </template>
    <template #default>
      <div>
        <span>水印开关：</span>
        <el-switch v-model="config.watermark" />
      </div>
    </template>
    <template #footer>
      <div>
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { useConfig } from '@/hooks/config';

const config = useConfig();

defineProps({
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue']);

function handleClose() {
  emit('update:modelValue', false);
}
</script>

<style>

</style>
