import { Burger, Orange, IceCreamSquare } from '@element-plus/icons-vue';
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
  },
  {
    title: '虚拟列表',
    path: '/list',
    icon: IceCreamSquare
  }
];
