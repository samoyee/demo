import { getNavBarHeight } from "../../../../utils/index";

Page({
  data: {
    isTabsSticky: false,
    top: getNavBarHeight(78) + "px",
  },
  onPageScroll() {
    this.selectComponent("#navbar").scroll();
    this.createSelectorQuery()
      .select("#tabs")
      .boundingClientRect()
      .exec((ret) => {
        if (ret && ret.length === 1) {
          const node = ret[0];
          this.setData({
            isTabsSticky:
              Math.abs(node.top - parseFloat(this.data.top)) <= 0.01,
          });
        }
      });
  },
  openAdd() {
    wx.showActionSheet({
      itemList: ["常规检查", "特殊检查", "手术记录"],
      success(res) {
        let url = "";
        if (res.tapIndex === 0) {
          url =
            "/modules/admin/pages/create-check/index?type=NORMAL&patientId=1234";
          wx.navigateTo({
            url,
          });
        } else if (res.tapIndex === 1) {
          wx.showActionSheet({
            itemList: ["激光手术复查", "ICL检查", "少儿屈光检查"],
            success() {
              url =
                "/modules/admin/pages/create-check/index?type=SPECIAL&patientId=1234";
              wx.navigateTo({
                url,
              });
            },
          });
        } else {
          url = "/modules/admin/pages/create-operation/index?patientId=1234";
          wx.navigateTo({
            url,
          });
        }
      },
    });
  },
  onPhoneCall() {
    wx.makePhoneCall({
      phoneNumber: "18667198030",
    });
  },
});
