Component({
  data: {
    active: "",
    admin: getApp().globalData.admin,
  },
  lifetimes: {
    created() {
      getApp().emitter.on({
        "pageChange|app": (active: string) => {
          this.setData({ active });
        },
        "login|app": ({ admin }: { admin: boolean }) => {
          getApp().globalData.admin = admin;
          this.setData({ admin });
        },
      });
    },
    attached() {
      this.setData({
        admin: getApp().globalData.admin,
      });
    },
  },
});
