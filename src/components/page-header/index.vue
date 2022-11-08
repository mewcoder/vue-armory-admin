<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue';
</script>

<template>
  <header class="ar-header">
    <el-space class="ar-header__left">
      <img src="@/assets/logo.svg" width="20" />
      <div>Armory Admin Vue</div>
    </el-space>
    <div class="ar-header__right">
      <el-button :icon="Setting" circle />
    </div>
  </header>
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
