import { EyeFormItem } from "../eye-form-item";

Component<
  Record<string, any>,
  Record<string, any>,
  EyeFormMethod,
  EyeFormInstance
>({
  lifetimes: {
    created() {
      this.formValue = {};
      this.formItems = {};
    },
  },
  relations: {
    "../eye-form-item/index": {
      type: "child",
    },
  },
  methods: {
    setFieldsValue(data: Record<string, any>) {
      for (let key in data) {
        const value = data[key];
        this.setFieldValue(key, value);
      }
    },
    setFieldValue(field: string, value: any) {
      this.formValue[field] = value;
      this.formItems[field]?.setValue(value);
    },
    onFormItemChange(field: string, value: any) {
      this.formValue[field] = value;
    },
    async validate() {
      return Promise.all(
        Object.values(this.formItems).map((formItem) => formItem.validate())
      ).then(() => {
        return this.formValue;
      });
    },
  },
});

export interface EyeFormMethod extends Record<string, Function> {
  validate: () => Promise<Record<string, any>>;
  setFieldsValue: (data: Record<string, any>) => void;
  setFieldValue: (field: string, value: any) => void;
  onFormItemChange: (field: string, value: any) => void;
}

export interface EyeFormInstance extends Record<string, any> {
  formValue: Record<string, any>;
  formItems: Record<string, EyeFormItem>;
}

export type EyeForm = WechatMiniprogram.Component.Instance<
  Record<string, any>,
  Record<string, any>,
  EyeFormMethod,
  EyeFormInstance,
  false
>;
