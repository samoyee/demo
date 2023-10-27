Component({
  properties: {
    data: {
      type: Array,
      value: [],
    },
    active: {
      type: Number,
      value: 0,
    },
  },

  data: {},

  methods: {
    onTap(e: WechatMiniprogram.CustomEvent) {
      const { index, item } = (e.target || e.currentTarget).dataset || {};
      this.triggerEvent("change", { index, item });
    },
  },
});
