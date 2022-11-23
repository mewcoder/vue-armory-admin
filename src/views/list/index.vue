<template>
  <div>
    <VirtualList ref="listRef" class="container" :list="dataList" :size="100">
      <template #default="{ item }">
        <div class="item-card">
          <img class="item-card__img" :src="item.img" />
          <div class="item-card__body">
            <div class="item-card__title">{{ item.title }}</div>
            <div class="item-card__description">{{ item.description }}</div>
          </div>
        </div>

        <!-- <div class="item">
          <span class="time">{{ item.date }}</span>
          <span class="value" :title="item.eventType">{{
            item.eventType
          }}</span>
          <span class="tag" :title="item.status">{{ item.status }}</span>
        </div> -->
      </template>
    </VirtualList>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import VirtualList from '@/components/virtual-list/index.vue';
import { getCardList } from '@/api/card';

const listRef = ref(null);

const dataList = ref([]);

async function getDataLit() {
  const res = await getCardList({
    pageNo: 1,
    pageSize: 20
  });
  if (res.code === 200) {
    dataList.value = res.data.list;
  }
}
getDataLit();
</script>

<script>
export default {
  name: 'ListView'
};
</script>

<style lang="scss" scoped>
.container {
  width: 400px;
  height: 600px;
  border: 1px solid #ccc;
  overflow: auto;
}
.item-card {
  height: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  &__img {
    width: 80px;
    height: 80px;
  }
  &__body {
    padding-left: 20px;
  }
  &__title {
    font-size: 16px;
  }
  &__description {
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
