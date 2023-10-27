Component({
  properties: {
    disabled: {
      type: Boolean,
      value: false,
    },
    placeholder: {
      type: String,
      value: "",
    },
    value: {
      type: String,
      value: "",
      observer(newValue) {
        if (newValue !== this.data.searchKey) {
          this.setData({
            searchKey: newValue,
          });
        }
      },
    },
  },

  data: {
    searchKey: "",
  },

  methods: {
    onInput(e: WechatMiniprogram.Input) {
      this.setData({
        searchKey: e.detail.value,
      });
    },
    onSearch() {
      this.triggerEvent("search", { searchKey: this.data.searchKey });
    },
    onClear() {
      this.setData({ searchKey: "" });
      this.triggerEvent("search", { searchKey: "" });
    },
  },
});
