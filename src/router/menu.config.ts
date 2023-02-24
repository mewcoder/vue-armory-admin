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
    title: '虚拟列表',
    icon: IceCreamSquare,
    children: [
      {
        title: '基本',
        path: '/vlist-base'
      },
      {
        title: '实时事件',
        path: '/vlist-ws'
      }
    ]
  },
  {
    title: '详情',
    path: '/about',
    icon: Orange
  }
];
