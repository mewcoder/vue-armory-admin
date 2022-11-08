<template>
  <el-drawer
    :model-value="modelValue"
    direction="rtl"
    append-to-body
    @click="handleClose"
  >
    <template #header>
      <h4>页面配置</h4>
    </template>
    <template #default>
      <div>
        <el-radio v-model="radio1" label="Option1" size="large">
          Option1
        </el-radio>
        <el-radio v-model="radio1" label="Option2" size="large">
          Optiond2
        </el-radio>
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
import { ref } from 'vue';
const radio1 = ref('Option1');

const emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: { type: Boolean, default: false }
});

function handleClose() {
  emit('update:modelValue', false);
}
</script>
