Component({
  options: {
    multipleSlots: true,
  },
  properties: {
    showNavBack: {
      type: Boolean,
      value: true,
    },
    showHome: {
      type: Boolean,
      value: false,
    },
    top: {
      type: Number,
      value: 100,
    },
    color: {
      type: String,
      value: "#333",
    },
  },
  data: {
    opacity: 0,
    statusBarHeight: 40,
    navBack: getCurrentPages().length > 1,
    home: getCurrentPages().length > 1,
    activeColor: "#333",
  },
  lifetimes: {
    attached() {
      const windowInfo = wx.getWindowInfo();
      this.setData({
        navBack: getCurrentPages().length > 1,
        home: getCurrentPages().length > 1,
        statusBarHeight: windowInfo.statusBarHeight,
        activeColor: this.properties.color,
      });
      this.threshold = this.properties.top;
      this.createSelectorQuery()
        .select("#navbar")
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret.length === 1) {
            const node = ret[0];
            this.threshold = Math.min(node.top, this.properties.top);
          }
        });
    },
  },
  methods: {
    scroll() {
      this.createSelectorQuery()
        .select("#navbar")
        .boundingClientRect()
        .exec((ret) => {
          if (ret && ret.length === 1) {
            const node = ret[0];
            let opacity = (this.threshold - node.top) / 50;
            opacity = Math.min(1, opacity);
            opacity = Math.max(0, opacity);
            this.setData({
              opacity,
              activeColor: opacity > 0.5 ? "#333" : this.properties.color,
            });
          }
        });
    },
  },
});
