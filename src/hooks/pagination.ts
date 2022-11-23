import { reactive } from 'vue';

export function usePagination(getList: any) {
  const pagination = reactive({
    pageNo: 1, // 当前页码
    pageSize: 20, // 每页显示数量
    total: 0 // 总数
  });

  const handleSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize;
    getList();
  };

  const handleCurrentChange = (currentPage: number) => {
    pagination.pageNo = currentPage;
    getList();
  };

  return {
    pagination,
    handleSizeChange,
    handleCurrentChange
  };
}
