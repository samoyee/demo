import { FormItem } from "../zz-form-item";

Component<Record<string, any>, Record<string, any>, FormMethod, FormInstance>({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  lifetimes: {
    created() {
      this.formValue = {};
      this.formItems = {};
    },
  },
  relations: {
    "/components/zz-form-item/index": {
      type: "child",
    },
  },
  methods: {
    async validate() {
      return Promise.all(
        Object.values(this.formItems).map((formItem: any) =>
          formItem.validate()
        )
      ).then(() => {
        return this.formValue;
      });
    },
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
  },
});

export interface FormMethod extends Record<string, Function> {
  validate: () => Promise<Record<string, any>>;
  setFieldsValue: (data: Record<string, any>) => void;
  setFieldValue: (field: string, value: any) => void;
  onFormItemChange: (field: string, value: any) => void;
}

export interface FormInstance extends Record<string, any> {
  formValue: Record<string, any>;
  formItems: Record<string, FormItem>;
}

export type Form = WechatMiniprogram.Component.Instance<
  Record<string, any>,
  Record<string, any>,
  FormMethod,
  FormInstance,
  false
>;
