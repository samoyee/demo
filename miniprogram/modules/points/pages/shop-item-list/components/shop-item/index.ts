import { exchange } from "../../../../../../services/points";

Component({
  properties: {
    item: Object,
  },

  methods: {
    onExchange() {
      const { id, score } = this.properties.item;
      wx.showModal({
        title: "确定要兑换吗？",
        success({ confirm }) {
          if (confirm) {
            exchange(id);
          }
        },
      });
    },
  },
});
