import {
  EyeFormItem,
  EyeFormItemInputInstance,
  EyeFormItemInputMethod,
} from "../eye-form-item";

Component<
  Record<string, any>,
  Record<string, any>,
  EyeFormItemInputMethod,
  EyeFormItemInputInstance
>({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  properties: {
    position: {
      type: String,
      value: "right",
    },
  },
  data: {
    right: "",
    left: "",
  },
  observers: {
    right(value) {
      this.formItem?.onFormItemInputChange(value, "right");
    },
    left(value) {
      this.formItem?.onFormItemInputChange(value, "left");
    },
  },
  relations: {
    "../eye-form-item/index": {
      type: "ancestor",
      linked(formItem: EyeFormItem) {
        this.formItem = formItem;
      },
      unlinked() {
        this.formItem = undefined;
      },
    },
  },
  methods: {
    setValue(value: any) {
      this.setData({
        right: value.right,
        left: value.left,
      });
    },
    validate() {
      return Promise.resolve();
    },
    chooseImages(e: WechatMiniprogram.CustomEvent) {
      const { position } = (e.currentTarget || e.target).dataset;
      wx.chooseMedia({
        count: 9,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        maxDuration: 30,
        camera: "back",
        success(res) {
          console.log(res.tempFiles);
        },
      });
    },
  },
});
