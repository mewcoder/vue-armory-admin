export default {
  props: {
    // 手动滚动步长
    step: {
      type: Number
    }
  },
  methods: {
    // 获取滚动步长
    getStep() {
      return this.step || this.size;
    },

    // 向上滚
    scrollUp() {
      if (this.scrollOffset <= 0) {
        return false;
      }
      let to = 0;
      let step = this.getStep();
      if (this.scrollOffset - step > 0) {
        to = this.scrollOffset - step;
      }
      this.scrollTo(to);
    },

    // 向下滚
    scrollDown() {
      if (this.totalHeight <= this.clientHeight) {
        return false;
      }
      let canScroll = this.totalHeight - this.clientHeight;
      if (this.scrollOffset >= canScroll) {
        return false;
      }
      let to = 0;
      let step = this.getStep();
      if (this.scrollOffset + step < canScroll) {
        to = this.scrollOffset + step;
      } else {
        to = canScroll;
      }
      this.scrollTo(to);
    }
  }
};
