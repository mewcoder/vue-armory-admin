import {
  ElMenu,
  ElMenuItem,
  ElScrollbar,
  ElSubMenu,
  ElIcon
} from 'element-plus';
import { Menu } from '@element-plus/icons-vue';
import { defineComponent, resolveComponent, h } from 'vue';
import { useRoute } from 'vue-router';
import menuList from '@/router/menu.config';

const MenuItem = defineComponent({
  props: {
    data: Array,
    default: () => []
  },
  setup(props) {
    console.log(props.data);
    return () =>
      (props.data as any).map((item: any) => {
        const slots = {
          title: () => {
            const Comp = item.icon;
            return (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {item.icon ? (
                  <ElIcon>
                    <Comp />
                  </ElIcon>
                ) : (
                  <span style={{ width: '10px' }}></span>
                )}
                {item.title}
              </span>
            );
          }
        };
        if (item?.children?.length) {
          return (
            <ElSubMenu index={item.title} key={item.title} v-slots={slots}>
              <MenuItem data={item.children} />
            </ElSubMenu>
          );
        } else {
          return (
            <ElMenuItem index={item.path} key={item.path} v-slots={slots} />
          );
        }
      });
  }
});

export default defineComponent({
  name: 'PageMenu',
  setup() {
    const route = useRoute();
    return () => (
      <ElScrollbar>
        <ElMenu router defaultActive={route.path}>
          <MenuItem data={menuList} />
        </ElMenu>
      </ElScrollbar>
    );
  }
});
