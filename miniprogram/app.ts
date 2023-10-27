import Auth from "./utils/auth";
import Fetch from "./utils/fetch";
import Emitter from "./utils/emitter";
import "./utils/dayjs.locale";

if (wx.canIUse("getUpdateManager")) {
  const updateManager = wx.getUpdateManager();

  updateManager.onCheckForUpdate(
    (res: WechatMiniprogram.OnCheckForUpdateListenerResult) => {
      // 没有版本更新
      if (!res.hasUpdate) {
      }
    }
  );

  updateManager.onUpdateReady(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好了，是否重启应用？",
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate();
        }
      },
    });
  });

  updateManager.onUpdateFailed(() => {
    wx.showModal({
      title: "更新提示",
      content: "新版本已经准备好了，需要您手动删除小程序后重新启动应用",
      showCancel: false,
      success() {
        wx.exitMiniProgram();
      },
    });
  });
}

const fetch = new Fetch({
  baseURL: "https://www.zzcal.com/weixin",
  //   baseURL: "http://localhost:20000/weixin",
});

const auth = new Auth({
  fetch,
});

const emitter = new Emitter();

App({
  auth,
  fetch,
  emitter,
  globalData: {
    admin: false,
    isNeedUpdate: true, // 是否要更新
  },
  onLaunch() {
    // auth.silentLogin().then((data) => {
    //   console.log(data);
    //   this.globalData.admin = true;
    //   emitter.emit("login|app", { admin: true });
    // });
  },
});
