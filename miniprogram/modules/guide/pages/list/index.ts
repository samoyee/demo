Page({
  data: {
    list: [],
  },

  onLoad() {
    this.loadData();
  },

  loadData() {
    getApp()
      .fetch.get("/content/guide/list")
      .then((list: any) => {
        this.setData({ list });
      })
      .catch(() => {});
  },

  onItemTap(e: WechatMiniprogram.CustomEvent) {
    const { item } = (e.currentTarget || e.target).dataset;
    wx.navigateTo({
      url: "/pages/webview/index?url=" + encodeURIComponent(item.url),
    });
  },
});
