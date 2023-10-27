import { Dayjs } from "dayjs";
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
    setDisabledDate(disabledDate: (date: Dayjs) => boolean) {
      this.selectComponent("#calendar").setDisabledDate(disabledDate);
    },
    onOpen() {
      this.setData({ open: true });
    },
    onSelect(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      this.setData({ open: false, value });
      this.triggerEvent("change", { value });
      this.formItem?.onFormItemInputChange(value);
    },
  },
});
