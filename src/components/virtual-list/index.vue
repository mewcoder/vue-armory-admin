<template>
  <div class="virtual-list">
    <!-- 容器  -->
    <div class="virtual-list__wrap" ref="wrapper" @scroll="onScroll">
      <!-- 为了撑起滚动条 总高度 = list.length * size -->
      <div
        class="virtual-list__ghost"
        :style="{ height: totalHeight + 'px' }"
      ></div>
      <!-- 绝对定位 渲染区域 -->
      <div class="virtual-list__view" :style="{ transform: getTransform }">
        <div
          ref="items"
          class="item"
          v-for="item in visibleList"
          :key="item.msg"
          :style="{ height: size + 'px' }"
        >
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => []
    },
    // 每一项高度，固定
    size: {
      type: Number,
      default: 40
    },

    // 触发到顶事件的偏移量
    startOffset: {
      type: Number,
      default: 0
    },

    // 触发到底事件的偏移量
    endOffset: {
      type: Number,
      default: 0
    },

    // 手动滚动步长
    step: {
      type: Number
    }
  },
  data() {
    return {
      // 总数据
      totalList: [],
      // 滚动偏移
      scrollOffset: 0,
      // 可视区域高度
      visibleHeight: 0,
      // 开始索引
      startIndex: 0,
      // 结束索引
      endIndex: 0,
      // 当前是否在滚动中
      scrolling: false
    };
  },
  computed: {
    // 总高度
    totalHeight() {
      return this.totalList.length * this.size;
    },
    visibleCount() {
      // 向上取整，+1为了防止空白
      return Math.ceil(this.visibleHeight / this.size) + 1;
    },
    // 实际展示的数据
    visibleList() {
      return this.totalList.slice(this.startIndex, this.endIndex);
    },
    // 实际展示的列表的偏移量
    getTransform() {
      const offset = this.scrollOffset - (this.scrollOffset % this.size);
      return `translateY(${offset}px)`;
    }
  },
  watch: {
    list: {
      handler(val = []) {
        this.totalList = val;
      },
      immediate: true
    }
  },
  mounted() {
    this.init();
    this.onScroll();
  },
  methods: {
    // 初始化
    init() {
      // 可视区域高度
      this.visibleHeight = this.$refs.wrapper.offsetHeight; // offsetHeight 包括 border
    },
    // 滚动监听
    onScroll() {
      this.scrollOffset = this.$refs.wrapper.scrollTop;
      // 实际展示数据的起始索引, 滚过去几条
      this.startIndex = Math.floor(this.scrollOffset / this.size); // 可视区域可显示的数量
      this.endIndex = this.startIndex + this.visibleCount;
    },

    // --------------------------------------------
    // 滚动
    scrollTo(to) {
      if (this.scrolling) {
        return false;
      }
      this.scrolling = true;
      const from = this.scrollOffset;
      const offset = to - from;
      const dur = 500;
      const startTime = Date.now();
      const run = () => {
        const curTime = Date.now();
        const spaceTime = curTime - startTime;
        const ratio = this.ease(spaceTime, 0, 1, dur);
        const curNum = offset * ratio;
        if (ratio >= 1) {
          this.$refs.wrapper.scrollTop = to;
          this.scrolling = false;
        } else {
          this.$refs.wrapper.scrollTop = from + curNum;
          requestAnimationFrame(run);
        }
      };
      run();
    },

    // 缓动函数，慢进慢出
    ease(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },

    //-------------------对外接口--------------------------

    addData(data, head) {
      // 头插
      if (head) {
        this.totalList = data.concat(this.totalList);
      } else {
        this.totalList = this.totalList.concat(data);
      }
    },

    // 滚动到顶部，会存在白屏现象
    scrollToTop() {
      this.scrollTo(0);
    },

    // 滚动到底部，会存在白屏现象
    scrollToBottom() {
      let bottom = this.totalHeight - this.visibleHeight;
      if (bottom > 0) {
        this.scrollTo(bottom);
      }
    },

    //-------------------对外事件--------------------------

    scrollTop() {
      let isScrollTop = this.scrollOffset - this.startOffset <= 0;
      if (isScrollTop) {
        this.$emit('toTop');
      }
    },

    scrollBottom() {
      let isScrollEnd =
        this.visibleHeight + this.scrollOffset >=
        this.totalHeight - this.endOffset;
      if (isScrollEnd) {
        this.$emit('toBottom');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.virtual-list {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .virtual-list__wrap {
    height: 100%;
    overflow-y: auto;
    position: relative;
    // margin-right: -20px;

    .virtual-list__ghost {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .virtual-list__view {
      left: 0;
      right: 17px;
      top: 0;
      position: absolute;
    }
  }
}
</style>
