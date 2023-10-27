Component({
  options: {
    addGlobalClass: true,
    virtualHost: true,
  },

  properties: {
    value: {
      type: Object,
    },
    showAdd: {
      type: Boolean,
    },
    showRemove: {
      type: Boolean,
    },
  },

  data: {
    sph: "",
    cyl: "",
    axis: "",
    far: "",
    near: "",
  },
  observers: {
    value(val) {
      this.setData({
        sph: "",
        cyl: "",
        axis: "",
        far: "",
        near: "",
        ...val,
      });
    },
    sph(val) {
      this.setValue("sph", val);
    },
    cyl(val) {
      this.setValue("cyl", val);
    },
    axis(val) {
      this.setValue("axis", val);
    },
    far(val) {
      this.setValue("far", val);
    },
    near(val) {
      this.setValue("near", val);
    },
  },

  methods: {
    onAdd() {
      this.triggerEvent("add");
    },
    onRemove() {
      this.triggerEvent("remove");
    },
    setValue(key: string, newData: any = "") {
      const { value } = this.data;
      let valueData = value[key] || "";
      if ("" + valueData !== "" + newData) {
        const data = {
          ...value,
          [key]: newData,
        };
        this.setData({ value: data });
        this.triggerEvent("change", { value: data });
      }
    },
  },
});
