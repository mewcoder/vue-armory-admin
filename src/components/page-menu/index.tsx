import { ElMenu, ElMenuItem, ElScrollbar, ElSubMenu } from 'element-plus';
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
  },
  {
    path: '/about2',
    title: 'about2'
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
        const slots = {
          title: () => item.title
        };
        if (item?.children?.length) {
          return (
            <ElSubMenu index={item.path} v-slots={slots}>
              <MenuItem data={item.children} />
            </ElSubMenu>
          );
        } else {
          return <ElMenuItem index={item.path} v-slots={slots} />;
        }
      });
  }
});

export default defineComponent({
  name: 'PageMenu',
  setup() {
    return () => (
      <ElScrollbar>
        <ElMenu>
          <MenuItem data={list} />
        </ElMenu>
      </ElScrollbar>
    );
  }
});
