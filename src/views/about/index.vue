<template>
  <main>
    about
    <WaterMark>
      <div>
        <!-- <img src="http://127.0.0.1:5173/logo.svg" width="20" /> -->
        <div>用户名：admin</div>
        <div>时间：2022-11-22 11:22:33</div>
        <div>IP地址：127.0.0.1</div>
      </div>
    </WaterMark>
  </main>
</template>

<script setup lang="ts">
import WaterMark from '@/components/watermark/index.jsx';
</script>

<script lang="ts">
export default {
  name: 'AboutView'
};
</script>
