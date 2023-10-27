// pages/index/components/home/index.ts
Component({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  properties: {
    appointData: {
      type: Object,
      value: {},
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    phones: [
      { phone: "0571-85318888", label: "成人近视激光咨询" },
      { phone: "0571-87176699", label: "少儿近视防控咨询" },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScroll() {
      this.selectComponent("#navbar").scroll();
    },
  },
});
