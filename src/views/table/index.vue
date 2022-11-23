<template>
  <div class="table-page">
    <el-form :model="form" label-position="top" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="Name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Region">
            <el-input v-model="form.region" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Resource">
            <el-input v-model="form.resource" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Description">
            <el-input v-model="form.description" />
          </el-form-item>
        </el-col>
      </el-row>
      <div style="float: right">
        <el-button type="primary" @click="onSubmit">Search</el-button>
        <el-button>Clear</el-button>
      </div>
    </el-form>
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <el-pagination
      class="pagination"
      v-model:current-page="pagination.pageNo"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { usePagination } from '@/hooks/pagination';
import { reactive } from 'vue';

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  resource: '',
  description: ''
});

const onSubmit = () => {
  console.log('submit!');
};

const { pagination, handleCurrentChange, handleSizeChange } = usePagination(
  () => {}
);

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];
</script>
<script lang="ts">
export default {
  name: 'TableView'
};
</script>

<style lang="scss" scoped>
.table-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  .table {
    flex: 1;
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>