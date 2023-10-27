import {
  FormItem,
  FormItemInputInstance,
  FormItemInputMethod,
} from "../zz-form-item";

Component<
  Record<string, any>,
  Record<string, any>,
  FormItemInputMethod,
  FormItemInputInstance
>({
  externalClasses: ["input-class"],
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  properties: {
    value: {
      type: String,
      optionalTypes: [Number],
    },
    placeholder: {
      type: String,
    },
  },
  relations: {
    "/components/zz-form-item/index": {
      type: "ancestor",
      linked(formItem: FormItem) {
        this.formItem = formItem;
      },
      unlinked() {
        this.formItem = undefined;
      },
    },
  },
  methods: {
    setValue(value) {
      this.setData({ value });
    },
    onInput(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      this.triggerEvent("change", { value });
      this.formItem?.onFormItemInputChange(value);
    },
    onChooseImage() {
      wx.chooseMedia({
        count: 1,
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
