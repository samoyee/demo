Component({
  externalClasses: ["scroll-class"],
  properties: {
    defaultRefresh: {
      type: Boolean,
      value: true,
    },
    hasMore: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    scrollTop: 0,
    triggered: false,
    isPulling: false,
  },

  lifetimes: {
    attached() {
      if (this.properties.defaultRefresh) {
        this.setData({
          triggered: true,
          isPulling: true,
        });
      }
    },
  },

  methods: {
    onScroll(e: WechatMiniprogram.TouchEvent) {
      this.triggerEvent("scroll", e.detail);
    },
    onPulling() {
      if (this.data.triggered) return;
      this.setData({ triggered: true, isPulling: true });
      setTimeout(() => {
        this.triggerEvent("pulling");
      }, 0);
    },
    onRefresh() {
      this.setData({ isPulling: false });
      this.triggerEvent("refresh");
    },
    onLoadMore() {
      this.properties.hasMore && this.triggerEvent("loadmore");
    },
    pulling() {
      if (this.data.triggered) return;
      this.setData({ triggered: true, scrollTop: 0 });
    },
    done() {
      this.setData({ triggered: false });
    },
  },
});
