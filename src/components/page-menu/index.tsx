import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { defineComponent } from 'vue';

const list = [
  {
    path: '/',
    title: 'home',
    children: [
      {
        path: 'child',
        title: 'child'
      }
    ]
  },
  {
    path: '/about',
    title: 'about'
  }
];

const MenuItem = defineComponent({
  props: {
    data: Array,
    default: () => []
  },
  setup(props) {
    return () =>
      (props.data as any).map((item: any) => {
        if (item.children && item.children.length) {
          return (
            <ElSubMenu
              index={item.path}
              v-slots={{
                title: () => item.title
              }}
            >
              <MenuItem data={item.children} />
            </ElSubMenu>
          );
        } else {
          return (
            <ElMenuItem
              index={item.path}
              v-slots={{
                title: () => item.title
              }}
            ></ElMenuItem>
          );
        }
      });
  }
});

const Menu = defineComponent({
  setup() {
    return () => (
      <ElMenu>
        <MenuItem data={list} />
      </ElMenu>
    );
  }
});

export default Menu;
