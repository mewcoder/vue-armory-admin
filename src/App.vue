<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageHeader from '@/components/page-header/index.vue';
import PageMenu from '@/components/page-menu/index';
import WaterMark from '@/components/watermark/index';
import { useConfig } from '@/hooks/config';

const config = useConfig();
</script>

<template>
  <el-container class="page-container">
    <el-header>
      <PageHeader />
    </el-header>
    <el-container>
      <el-aside width="200px"><PageMenu /></el-aside>
      <el-main>
        <div class="view-wrap"><RouterView /></div>
        <WaterMark v-if="config.watermark">
          <div>
            <div>用户名：admin</div>
            <div>IP地址：127.0.0.1</div>
          </div>
        </WaterMark>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.page-container {
  height: 100vh;
}
.el-header {
  border-bottom: 1px solid #dcdfe6;
}
.el-aside {
  height: calc(100vh - 60px);
  border-right: 1px solid #dcdfe6;

  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  :deep(.el-menu) {
    height: 100%;
    border-right: none;
  }
}
.el-main {
  position: relative;
  background-color: #f2f3f5;
  .view-wrap {
    background: #fff;
    padding: 24px;
    border-radius: 4px;
  }
}
</style>
