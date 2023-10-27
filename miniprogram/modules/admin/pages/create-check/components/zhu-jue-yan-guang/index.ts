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
    list: [
      {
        right: { sph: "", cyl: "", axis: "", far: "", near: "" },
        left: { sph: "", cyl: "", axis: "", far: "", near: "" },
      },
    ],
  },
  observers: {
    list(value) {
      this.formItem?.onFormItemInputChange(value);
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
        list: value,
      });
    },
    validate() {
      return Promise.resolve();
    },
    onChange(
      e: WechatMiniprogram.CustomEvent<
        { value: any },
        {
          index: number;
          position: "left" | "right";
        },
        {
          index: number;
          position: "left" | "right";
        }
      >
    ) {
      const { index, position } = (e.currentTarget || e.target).dataset;
      const { value } = e.detail;
      const { list } = this.data;
      list[index][position] = value;
      this.setData({
        list: [...list],
      });
    },
    onAdd() {
      const { list } = this.data;
      list.push({
        right: { sph: "", cyl: "", axis: "", far: "", near: "" },
        left: { sph: "", cyl: "", axis: "", far: "", near: "" },
      });
      this.setData({
        list: [...list],
      });
    },
    onRemove(e: WechatMiniprogram.CustomEvent) {
      const { index } = (e.currentTarget || e.target).dataset;
      const { list } = this.data;
      list.splice(index, 1);
      this.setData({
        list: [...list],
      });
    },
  },
});
