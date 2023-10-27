Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    showHeader: {
      type: Boolean,
      value: true,
    },
    fullScreen: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    onCancel() {
      this.setData({ visible: false });
      this.triggerEvent("cancel");
    },
    onConfirm() {
      this.triggerEvent("confirm");
    },
    afterClose() {
      this.triggerEvent("after-close");
    },
  },
});
