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
  options: { virtualHost: true, addGlobalClass: true },
  properties: {
    position: {
      type: String,
      value: "right",
    },
  },
  data: {
    rightSph: "",
    rightCyl: "",
    rightAxis: "",
    leftSph: "",
    leftCyl: "",
    leftAxis: "",
  },

  observers: {
    rightSph(value) {
      this.formItem?.onFormItemInputChange(value, "right", "sph");
    },
    rightCyl(value) {
      this.formItem?.onFormItemInputChange(value, "right", "cyl");
    },
    rightAxis(value) {
      this.formItem?.onFormItemInputChange(value, "right", "axis");
    },
    leftSph(value) {
      this.formItem?.onFormItemInputChange(value, "left", "sph");
    },
    leftCyl(value) {
      this.formItem?.onFormItemInputChange(value, "left", "cyl");
    },
    leftAxis(value) {
      this.formItem?.onFormItemInputChange(value, "left", "axis");
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
        rightSph: value.right.sph,
        rightCyl: value.right.cyl,
        rightAxis: value.right.axis,
        leftSph: value.left.sph,
        leftCyl: value.left.cyl,
        leftAxis: value.left.axis,
      });
    },
    validate() {
      return Promise.resolve();
    },
  },
});
