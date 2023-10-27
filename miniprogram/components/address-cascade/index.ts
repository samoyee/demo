import { getAddress, AddressData } from "../../services/address";

Component<
  Record<string, any>,
  Record<string, any>,
  Record<string, any>,
  { timer: number }
>({
  options: {
    virtualHost: true,
    addGlobalClass: true,
  },
  properties: {
    value: {
      type: String,
    },
    label: {
      type: String,
    },
  },
  data: {
    activeColumnIndex: -1,
    values: [] as string[],
    columns: [] as AddressData[][],
    tabs: [] as Tab[],
  },
  observers: {
    value(value) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        getAddress({ ids: value })
          .then((data) => {
            const tabs = [];
            const columns = [];
            const values = value ? value.split(" ") : [];
            let column: Array<AddressData> = data;
            let label = "";
            for (const value of values) {
              columns.push(column);
              const opt = column.find((item) => item.id === value);
              column = opt?.children || [];
              tabs.push({ type: "text", value: opt?.name });
              label += " " + opt?.name || "";
            }
            if (!value) {
              columns.push(column);
              tabs.push({ type: "placeholder", value: "请选择" });
            }
            this.setData({
              label,
              activeColumnIndex: !value ? -1 : values.length - 1,
              values: value ? value.split(" ") : [],
              tabs,
              columns,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100);
    },
  },
  methods: {
    onOptionSelect(e: WechatMiniprogram.CustomEvent) {
      const { option, columnIndex } = (e.currentTarget || e.target).dataset;
      const { values, columns, tabs } = this.data;
      values[columnIndex] = option.id;
      tabs[columnIndex] = { type: "text", value: option.name };
      if (!option.leaf) {
        if (option.children && option.children.length) {
          columns[columnIndex + 1] = option.children;
          tabs[columnIndex + 1] = { type: "placeholder", value: "请选择" };
          this.setData({
            activeColumnIndex: columnIndex,
            values: values.slice(0, columnIndex + 1),
            columns: columns.slice(0, columnIndex + 2),
            tabs: tabs.slice(0, columnIndex + 2),
          });
        } else {
          getAddress({ id: option.id }).then((children) => {
            option.children = children;
            columns[columnIndex + 1] = option.children;
            tabs[columnIndex + 1] = { type: "placeholder", value: "请选择" };
            this.setData({
              activeColumnIndex: columnIndex,
              values: values.slice(0, columnIndex + 1),
              columns: columns.slice(0, columnIndex + 2),
              tabs: tabs.slice(0, columnIndex + 2),
            });
          });
        }
      } else {
        this.setData(
          {
            activeColumnIndex: columnIndex,
            values: values.slice(0, columnIndex + 1),
            columns: columns.slice(0, columnIndex + 1),
            tabs: tabs.slice(0, columnIndex + 1),
          },
          () => {
            const { tabs } = this.data;
            this.setData({
              label: tabs.map((item: Tab) => item.value).join(" "),
            });
            this.triggerEvent("select", { value: this.data.values.join(" ") });
          }
        );
      }
    },
    onColumnChange(e: WechatMiniprogram.CustomEvent) {
      const { item, columnIndex } = (e.currentTarget || e.target).dataset;
      const { values, columns, tabs } = this.data;
      if (item.type === "placeholder") return;
      tabs[columnIndex] = { type: "placeholder", value: "请选择" };
      this.setData({
        activeColumnIndex: columnIndex - 1,
        values: values.slice(0, columnIndex),
        tabs: tabs.slice(0, columnIndex + 1),
        columns: columns.slice(0, columnIndex + 1),
      });
    },
  },
});

interface Tab {
  type: "placeholder" | "text";
  value: string;
}
