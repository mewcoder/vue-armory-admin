<template>
  <div class="about">
    <h1>This is an virual-list page</h1>
    <el-button @click="handleOpen">开始</el-button>
    <el-button @click="handleClose">结束</el-button>
  </div>
</template>
<script setup>
import Socket from '@/utils/socket';

let ws;

function handleOpen() {
  ws = new Socket('ws://127.0.0.1:3000/ws?userId=admin');
}

function handleClose() {
  ws.close();
}
</script>

/** * 笔记： * https://github.com/chaimHL/vue-long-list-optimization */

<style lang="scss" scoped>
.vlist {
  height: 400px;
  width: 400px;
  border: 1px solid #ccc;
  overflow: auto;
}
.item-active {
  border: 1px solid #132944;
}
</style>
