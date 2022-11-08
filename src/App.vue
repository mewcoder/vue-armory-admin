<script setup lang="ts">
import { RouterView } from 'vue-router';
import PageMenu from '@/components/page-menu/index.tsx';
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px"><PageMenu /></el-aside>
      <el-main> <RouterView /></el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
