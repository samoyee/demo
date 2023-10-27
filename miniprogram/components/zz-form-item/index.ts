import { Form } from "../zz-form";

Component<
  Record<string, any>,
  Record<string, any>,
  FormItemMethod,
  FormItemInstance
>({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  properties: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    initialValue: {
      type: String,
    },
    rules: {
      type: Array,
      value: [],
    },
    required: {
      type: Boolean,
      value: false,
    },
  },
  relations: {
    "/components/zz-form/index": {
      type: "parent",
      linked(form: Form) {
        if (!this.properties.name) {
          throw `the property 'name' cannot undefined when this component in zz-form`;
        }
        if (form.formItems[this.properties.name]) {
          throw `zz-form-item properties name=<${this.properties.name}> has exists`;
        }
        form.formItems[this.properties.name] = this;
        this.form = form;
      },
      unlinked(form) {
        delete form.formItems[this.properties.name];
      },
    },
    "/components/zz-form-input/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "/components/zz-form-avatar/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "/components/zz-form-textarea/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "/components/zz-form-select/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "/components/zz-form-date/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "/components/zz-form-address/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
    "/components/zz-form-radio/index": {
      type: "descendant",
      linked(input: FormItemInput) {
        if (this.formItemInput) {
          throw "form-item child is not single";
        }
        this.formItemInput = input;
      },
      unlinked() {
        delete this.formItemInput;
      },
    },
  },
  data: {
    error: "",
  },
  methods: {
    async validate() {
      try {
        for (const rule of this.properties.rules) {
          await validate({ ...rule, value: this.value });
        }
        return this.value;
      } catch (error) {
        this.setData({
          error,
        });
        throw error;
      }
    },
    setValue(value: any) {
      this.value = value;
      this.formItemInput?.setValue(value);
    },
    onFormItemInputChange(value: any) {
      this.setData({ error: "" });
      this.value = value;
      this.form?.onFormItemChange(this.properties.name, this.value);
    },
  },
});

interface Rule {
  type?: "string" | "number" | "array" | "object";
  required?: string;
  min?: number;
  max?: number;
  message?: string;
  value: any;
  pattern?: string;
  validator: (value?: any) => Promise<any>;
}

function validate(rule: Rule) {
  const {
    required,
    min,
    max,
    message = "校验失败",
    value,
    type = "string",
    pattern,
    validator,
  } = rule;
  if (required) {
    if (!value) return Promise.reject(message);
  }
  if (typeof max === "number") {
    if (type === "string" && typeof value === "string" && value.length > max)
      return Promise.reject(message);
    else if (type === "number" && typeof value === "number" && value > max)
      return Promise.reject(message);
    else if (type === "array" && Array.isArray(value) && value.length > max)
      return Promise.reject(message);
  }
  if (typeof min === "number") {
    if (type === "string" && typeof value === "string" && value.length < min)
      return Promise.reject(message);
    else if (type === "number" && typeof value === "number" && value < min)
      return Promise.reject(message);
    else if (type === "array" && Array.isArray(value) && value.length < min)
      return Promise.reject(message);
  }
  if (pattern && !new RegExp(pattern).test(value)) {
    return Promise.reject(message);
  }
  if (typeof validator === "function") {
    return validator(value);
  }
  return Promise.resolve(value);
}

export interface FormItemMethod extends Record<string, Function> {
  validate: () => Promise<any>;
  setValue: (value: any) => void;
  onFormItemInputChange: (value: any, ...keys: (string | number)[]) => void;
}

export interface FormItemInstance extends Record<string, any> {
  form?: Form;
  formItemInput?: FormItemInput;
  value: any;
}

export type FormItem = WechatMiniprogram.Component.Instance<
  Record<string, any>,
  Record<string, any>,
  FormItemMethod,
  FormItemInstance
>;

export interface FormItemInputMethod extends Record<string, Function> {
  setValue: (value: any) => void;
}

export interface FormItemInputInstance extends Record<string, any> {
  formItem?: FormItem;
}

export type FormItemInput = WechatMiniprogram.Component.Instance<
  Record<string, any>,
  Record<string, any>,
  FormItemInputMethod,
  FormItemInputInstance
>;
