Page({
  data: {
    appoint: null,
    swipers: [],
    info: {},
    doctor: false,
  },
  needUpdate: true,
  onLoad(query) {
    // 测试用
    this.setData({
      doctor: query.doctor,
    });
    getApp().emitter.emit('login|app', { admin: !!query.doctor });
    this.needUpdate = true;
    this.loadData();
  },
  loadData() {
    if (!this.needUpdate) return;
    this.needUpdate = false;
    getApp()
      .fetch.post("/index")
      .then((data: any) => {
        this.setData({
          appoint: data.appoint,
          swipers: data.swipers,
          info: {
            address: data.address,
            phoneNumbers: data.phoneNumbers,
          },
        });
      })
      .catch(() => {});
  },
  onShow() {
    getApp().emitter.emit("pageChange|app", "pages/index/index");
    this.loadData();
  },
  onHide() {
    this.needUpdate = true;
  },
  onRefresh() {
    this.needUpdate = true;
    this.loadData();
  },
  onGoH5(e: WechatMiniprogram.CustomEvent) {
    const { url } = e.currentTarget.dataset;
    wx.navigateTo({
      url: "/pages/webview/index?url=" + encodeURIComponent(url),
    });
  },
});
