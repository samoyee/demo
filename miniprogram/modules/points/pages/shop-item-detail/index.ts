import { exchange, getGoodsDetail } from "../../../../services/points";

Page({
  data: {
    data: null,
    showError: false,
    errorType: "",
    errorMsg: "",
  },
  query: {},
  onLoad(query) {
    this.query = query;
    this.loadData();
  },

  onPageScroll() {
    this.selectComponent("#navbar").scroll();
  },

  async loadData() {
    try {
      const data = await getGoodsDetail(this.query.id);
      this.setData({ data, showError: false });
    } catch (err) {
      this.setData({
        data: null,
        showError: true,
        errorType: "",
        errorMsg: "",
      });
    }
  },

  onExchange() {
    const { id } = this.data.data || {};
    wx.showModal({
      title: "确定要兑换吗？",
      success({ confirm }) {
        if (confirm) {
          exchange(id);
        }
      },
    });
  },
});
