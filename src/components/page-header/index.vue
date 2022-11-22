<script lang="ts" setup>
import { ref } from 'vue';
import { Setting, UserFilled } from '@element-plus/icons-vue';
import pageConfig from '../page-config/index.vue';

const showConfig = ref(false);
const handleSet = () => {
  showConfig.value = true;
};
</script>

<template>
  <header class="ar-header">
    <el-space class="ar-header__left">
      <img src="@/assets/logo.svg" width="20" />
      <div>Armory Admin</div>
    </el-space>
    <el-space class="ar-header__right">
      <el-button :icon="Setting" circle @click="handleSet" />
      <el-dropdown>
        <el-avatar :size="32" :icon="UserFilled" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-space>
  </header>
  <pageConfig v-model="showConfig"></pageConfig>
</template>

<style lang="scss" scoped>
.ar-header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 100%;
  &__left {
    height: 100%;
    font-weight: 600;
    font-family: sans-serif;
  }
  &__right {
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
