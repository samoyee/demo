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
    },
    placeholder: {
      type: String,
    },
  },
  data: {
    open: false,
    label: "",
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
    onOpen() {
      this.setData({ open: true });
    },
    afterClose() {
      this.setData({
        mounted: false,
      });
    },
    onSelect(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      this.setData({ open: false });
      this.triggerEvent("change", { value });
      this.formItem?.onFormItemInputChange(value);
    },
  },
});
