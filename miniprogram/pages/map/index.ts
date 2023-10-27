Page({
  data: {
    active: false,
    scrollTop: 0,
  },
  onToggleActive() {
    this.setData({
      active: !this.data.active,
      scrollTop: this.data.active ? this.data.scrollTop : 0,
    });
  },
});
