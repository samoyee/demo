Page({
  data: {
    checked: false,
  },
  onCheckChange() {
    const { checked } = this.data;
    this.setData({ checked: !checked });
  },
  async onGetPhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
    const { errMsg, ...params } = e.detail;
    if (errMsg === "getPhoneNumber:fail user deny") {
      // 用户取消的授权的逻辑
      wx.showToast({
        title: "您已取消授权登录",
        icon: "none",
        complete() {
          wx.navigateBack();
        },
      });
      getApp().auth.trigger(undefined, "请授权登录后，再次尝试");
    } else if (errMsg === "getPhoneNumber:ok") {
      // 用户授权的
      getApp()
        .auth.login(params)
        .then(() => {
          wx.navigateBack();
        })
        .catch((error: any) => {
          wx.showToast({
            title: error.message,
            icon: "none",
          });
        });
    }
  },
  onTap() {
    wx.showToast({
      title: "请仔细阅读用户协议和隐私政策后并授权",
      icon: "none",
    });
  },
});
