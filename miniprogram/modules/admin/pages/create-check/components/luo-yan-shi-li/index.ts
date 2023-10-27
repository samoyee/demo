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
    rightFar: "",
    rightNear: "",
    leftFar: "",
    leftNear: "",
  },
  observers: {
    rightFar(value) {
      this.formItem?.onFormItemInputChange(value, "right", "far");
    },
    rightNear(value) {
      this.formItem?.onFormItemInputChange(value, "right", "near");
    },
    leftFar(value) {
      this.formItem?.onFormItemInputChange(value, "left", "far");
    },
    leftNear(value) {
      this.formItem?.onFormItemInputChange(value, "left", "near");
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
        rightFar: value.right.far,
        rightNear: value.right.near,
        leftFar: value.left.far,
        leftNear: value.left.near,
      });
    },
    validate() {
      return Promise.resolve();
    },
  },
});
