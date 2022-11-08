import { Burger, Orange } from '@element-plus/icons-vue';
export default [
  {
    title: '基础',
    icon: Burger,
    children: [
      {
        title: '表格',
        path: '/table'
      },
      {
        title: '表单',
        path: '/form'
      }
    ]
  },
  {
    title: '详情',
    path: '/about',
    icon: Orange
  }
];
