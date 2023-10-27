Component({
  properties: {
    item: Object,
  },

  methods: {
    onRemove() {
      wx.showModal({
        content: "确定要删除当前兑换记录吗？",
        success({ confirm }) {
          console.log(confirm);
        },
      });
    },
    onCancel() {
      wx.showModal({
        content: "确定要取消兑换吗？",
        success({ confirm }) {
          if (confirm) {
          }
        },
      });
    },
  },
});
