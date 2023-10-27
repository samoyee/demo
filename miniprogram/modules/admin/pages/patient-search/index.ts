Page({
  data: {},

  goToDetail() {
    wx.navigateTo({
      url: "/modules/admin/pages/patient-detail/index",
    });
  },

  onPhoneCall() {
    wx.makePhoneCall({
      phoneNumber: "18667198030",
    });
  },
});
