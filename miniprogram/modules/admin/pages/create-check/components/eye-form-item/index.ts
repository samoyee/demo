import { EyeForm } from "../eye-form";

Component<
  Record<string, any>,
  Record<string, any>,
  EyeFormItemMethod,
  EyeFormItemInstance
>({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  properties: {
    name: {
      type: String,
    },
  },
  relations: {
    "../eye-form/index": {
      type: "parent",
      linked(form: EyeForm) {
        if (!this.properties.name) {
          throw `the property 'name' cannot undefined when this component in form`;
        }
        if (form.formItems[this.properties.name]) {
          throw `form-item properties name=<${this.properties.name}> has exists`;
        }
        form.formItems[this.properties.name] = this;
        this.form = form;
      },
      unlinked(form) {
        delete form.formItems[this.properties.name];
        this.form = undefined;
      },
    },
    "../luo-yan-shi-li/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = {
          right: {
            far: "",
            near: "",
          },
          left: {
            far: "",
            near: "",
          },
        };
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "../dian-nao-yan-guang/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = {
          right: {
            sph: "",
            cyl: "",
            axis: "",
          },
          left: {
            sph: "",
            cyl: "",
            axis: "",
          },
        };
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "../tong-kong-zhi-jing/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = {
          right: "",
          left: "",
        };
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "../yan-bu-jian-cha/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = {
          right: "",
          left: "",
        };
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "../yan-ya/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = {
          right: "",
          left: "",
        };
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "../yan-zhou-chang-du/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = {
          right: "",
          left: "",
        };
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "../zhu-jue-yan-guang/index": {
      type: "descendant",
      linked(input: EyeFormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.value = [
          {
            right: { sph: "", cyl: "", axis: "", far: "", near: "" },
            left: { sph: "", cyl: "", axis: "", far: "", near: "" },
          },
        ];
        this.form?.onFormItemChange(this.properties.name, this.value);
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
  },
  methods: {
    async validate() {
      try {
        return this.formItemInput?.validate
          ? this.formItemInput.validate()
          : Promise.resolve();
      } catch (err) {
        throw err;
      }
    },
    setValue(value: any) {
      this.value = value;
      this.formItemInput?.setValue(value);
    },
    onFormItemInputChange(value: any, ...keys: (string | number)[]) {
      if (keys && keys.length > 0) {
        changeValue(this.value, keys, value);
      } else {
        this.value = value;
      }
      this.form?.onFormItemChange(this.properties.name, this.value);
    },
  },
});

function changeValue(value: any, keys: (string | number)[], newValue: any) {
  const key = keys.splice(0, 1)[0];
  if (keys.length > 0) {
    changeValue(value[key], keys, newValue);
    return;
  }
  value[key] = newValue;
}

export interface EyeFormItemMethod extends Record<string, Function> {
  validate: () => Promise<any>;
  setValue: (value: any) => void;
  onFormItemInputChange: (value: any, ...keys: (string | number)[]) => void;
}

export interface EyeFormItemInstance extends Record<string, any> {
  form?: EyeForm;
  formItemInput?: EyeFormItemInput;
  value: any;
}

export type EyeFormItem = WechatMiniprogram.Component.Instance<
  Record<string, any>,
  Record<string, any>,
  EyeFormItemMethod,
  EyeFormItemInstance
>;

export interface EyeFormItemInputMethod extends Record<string, Function> {
  setValue: (value: any) => void;
  validate: () => Promise<void>;
}

export interface EyeFormItemInputInstance extends Record<string, any> {
  formItem?: EyeFormItem;
}

export type EyeFormItemInput = WechatMiniprogram.Component.Instance<
  Record<string, any>,
  Record<string, any>,
  EyeFormItemInputMethod,
  EyeFormItemInputInstance
>;
