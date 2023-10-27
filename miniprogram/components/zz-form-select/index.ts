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
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    options: {
      type: Array,
    },
  },
  data: {
    open: false,
  },
  observers: {
    options(value) {
      const option = value.find(
        (item: any) => (item.value || item) === this.data.value
      );
      this.setData({ label: option?.label || option || "" });
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
      const option = this.data.options.find(
        (item: any) => (typeof item === "object" ? item.value : item) === value
      );
      this.setData({
        value,
        label: option?.label || option || "",
      });
    },
    onOpen() {
      this.setData({ open: true });
    },
    onSelect(e: WechatMiniprogram.CustomEvent) {
      const { value, label, disabled } = e.currentTarget.dataset;
      if (disabled) return;
      this.setData({
        value,
        label,
        open: false,
      });
      this.triggerEvent("change", { value });
      this.formItem?.onFormItemInputChange(value);
    },
  },
});
