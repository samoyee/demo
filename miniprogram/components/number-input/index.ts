Component({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  externalClasses: ["input-class"],
  properties: {
    value: {
      type: String,
      value: "",
    },
    placeholder: {
      type: String,
    },
    fixed: {
      type: Number,
      value: 0,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    placeholderValue: "",
  },
  observers: {
    value(val) {
      if (val) {
        let isBurden = /^\-/.test(val);
        const _value = Math.abs(+val || 0);
        if (!Number.isNaN(_value)) {
          this.setData({
            placeholderValue:
              (isBurden ? "-" : "") + _value.toFixed(this.properties.fixed),
          });
        }
        return;
      }
      this.setData({ placeholderValue: "" });
    },
  },
  methods: {
    onInput() {},
  },
});
