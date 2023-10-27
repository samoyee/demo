import dayjs from "dayjs";

export interface DateOption {
  week: number;
  day: number;
  date: string;
  beforeToday: boolean;
  today: boolean;
  disabled: boolean;
}

export interface MonthData {
  month: string;
  dates: DateOption[];
}

const now = dayjs();
const start = now.startOf("month");
const length = start.add(6, "month").endOf("month").diff(start, "day") + 1;

function createDate(
  length: number,
  disabledDate?: (date: DateOption) => boolean
) {
  const list = [];
  let lastMonth = -1;
  let monthData: MonthData | null = null;
  for (let i = 0; i < length; i++) {
    const day = start.add(i, "day");
    const month = day.get("month") + 1;
    if (month !== lastMonth) {
      lastMonth = month;
      monthData = {
        month: day.format("MM月"),
        dates: [],
      };
      list.push(monthData);
    }
    if (monthData) {
      const item = {
        week: day.get("day"),
        month,
        day: day.get("date"),
        date: day.format("YYYY-MM-DD"),
        beforeToday: day.diff(now, "hour") <= 0,
        today: day.format("YYYY-MM-DD") === now.format("YYYY-MM-DD"),
        disabled: day.diff(now, "hour") <= 0,
      };
      monthData.dates.push({
        ...item,
        disabled: item.disabled || (disabledDate ? disabledDate(item) : false),
      });
    }
  }
  return list;
}

Component({
  properties: {
    value: {
      type: String,
      value: "",
    },
  },
  data: {
    month: now.get("month") + 1,
    list: createDate(length),
    quick: [
      { value: 0, label: "明天" },
      { value: 7, label: "一周后" },
      { value: 30, label: "一月后" },
      { value: 60, label: "两月后" },
      { value: 180, label: "半年后" },
    ],
    showMore: false,
    scrollId: "",
    dialogScrollId: "",
  },

  methods: {
    onSelect(e: WechatMiniprogram.CustomEvent) {
      const { item } = (e.currentTarget || e.target).dataset;
      if (item.disabled) return;
      this.setData({
        month: item.month,
        value: item.date,
      });
      this.triggerEvent("change", { value: item.date });
    },
    onDialogSelect(e: WechatMiniprogram.CustomEvent) {
      const { item } = (e.currentTarget || e.target).dataset;
      if (item.disabled) return;
      this.setData(
        {
          month: item.month,
          value: item.date,
          scrollId: "#date-" + item.date,
          showMore: false,
        },
        () => {
          this.setData({
            scrollId: "",
          });
        }
      );
      this.triggerEvent("change", { value: item.date });
    },
    setDisabledDate(callback: (date: DateOption) => boolean) {
      this.setData({
        list: createDate(length, callback),
        value: "",
      });
      this.triggerEvent("change", { value: "" });
    },
    onQuick(e: WechatMiniprogram.CustomEvent) {
      const { item } = (e.currentTarget || e.target).dataset;
      const start = now.add(item.value + 1, "day");
      this.setData(
        {
          dialogScrollId: "#dialog-date-" + start.format("YYYY-MM-DD"),
          value: "",
        },
        () => {
          this.setData({
            dialogScrollId: "",
          });
        }
      );
    },
    onShowMore() {
      this.setData(
        {
          showMore: true,
          dialogScrollId: this.properties.value
            ? "#dialog-date-" + this.properties.value
            : "",
        },
        () => {
          this.setData({
            dialogScrollId: "",
          });
        }
      );
    },
    onClose() {
      this.setData({
        showMore: false,
      });
    },
  },
});
