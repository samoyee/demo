Component({
  properties: {
    value: {
      type: Number,
      value: -1,
    },
    options: {
      type: Array,
      value: [],
    },
  },
  methods: {
    onSelect(e: WechatMiniprogram.CustomEvent) {
      const { item } = (e.currentTarget || e.target).dataset;
      if (item.disabled) return;
      this.triggerEvent("change", { value: item.value });
      this.setData({ value: item.value });
    },
  },
});
