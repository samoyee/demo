import dayjs, { Dayjs } from "dayjs";

const now = dayjs();

function disabledDate(date: MonthDate) {
  return false;
}

const years = setYears(now);

const min = dayjs(`${years[0]}-01-01`, "YYYY-MM-DD");
const max = dayjs(`${years[years.length - 1]}-12-31`, "YYYY-MM-DD");

Component<
  Record<string, any>,
  Record<string, any>,
  Record<string, any>,
  {
    disabledDate: (date: MonthDate) => boolean;
    yearMonthChangeReady: boolean;
    yearMonthChangeValue: number[];
  }
>({
  properties: {
    value: {
      type: String,
      value: now.format("YYYY-MM-DD"),
    },
  },
  data: {
    year: now.year(),
    month: now.month() + 1,
    date: now.date(),
    monthDates: setMonthDate(now, disabledDate),
    firstWeek: now.startOf("month").day(),
    open: false,
    years,
    yearMonthValue: setYearMonth(years, now),
  },
  lifetimes: {
    created() {
      this.disabledDate = disabledDate;
    },
  },
  observers: {
    value(value) {
      const _value = value ? dayjs(value, "YYYY-MM-DD") : now;
      this.setData({
        year: _value.year(),
        month: _value.month() + 1,
        date: _value.date(),
        monthDates: setMonthDate(_value, (date) => this.disabledDate(date)),
        firstWeek: _value.startOf("month").day(),
        yearMonthValue: setYearMonth(this.data.years, _value),
      });
    },
  },
  methods: {
    setDisabledDate(disabledDate: (date: MonthDate) => boolean) {
      this.disabledDate = disabledDate;
      const _value = this.properties.value
        ? dayjs(this.properties.value, "YYYY-MM-DD")
        : now;
      this.setData({
        year: _value.year(),
        month: _value.month() + 1,
        date: _value.date(),
        monthDates: setMonthDate(_value, (date) => this.disabledDate(date)),
        firstWeek: _value.startOf("month").day(),
        yearMonthValue: setYearMonth(this.data.years, _value),
      });
    },
    onSelect(e: WechatMiniprogram.CustomEvent) {
      const { value, disabled } = e.currentTarget.dataset;
      if (disabled) return;
      this.setData({ value });
      this.triggerEvent("select", { value });
    },
    onYearMonthOpen() {
      this.yearMonthChangeReady = true;
      this.setData({ open: true });
    },
    onYearMonthChange(e: WechatMiniprogram.CustomEvent) {
      const { value } = e.detail;
      this.yearMonthChangeValue = value;
    },
    onYearMonthChangeReadyStart() {
      this.yearMonthChangeReady = false;
    },
    onYearMonthChangeReadyEnd() {
      this.yearMonthChangeReady = true;
    },
    onYearMonthConfirm() {
      const _value = getYearMonth(this.data.years, this.yearMonthChangeValue);
      if (this.yearMonthChangeReady) {
        this.setData({
          open: false,
          year: _value.year(),
          month: _value.month() + 1,
          date: _value.date(),
          monthDates: setMonthDate(_value, (date) => this.disabledDate(date)),
          firstWeek: _value.startOf("month").day(),
          yearMonthValue: this.yearMonthChangeValue,
        });
      }
    },
    onYearMonthCancel() {
      if (this.yearMonthChangeReady) {
        this.setData({
          yearMonthValue: this.data.yearMonthValue,
          open: false,
        });
      }
    },
    onPrevMonth() {
      const _value = getYearMonth(
        this.data.years,
        this.data.yearMonthValue
      ).subtract(1, "month");
      if (_value.diff(min, "month") < 0) return;
      this.setData({
        year: _value.year(),
        month: _value.month() + 1,
        date: _value.date(),
        monthDates: setMonthDate(_value, (date) => this.disabledDate(date)),
        firstWeek: _value.startOf("month").day(),
        yearMonthValue: setYearMonth(this.data.years, _value),
      });
    },
    onNextMonth() {
      const _value = getYearMonth(
        this.data.years,
        this.data.yearMonthValue
      ).add(1, "month");
      if (_value.diff(max, "month") > 0) return;
      this.setData({
        year: _value.year(),
        month: _value.month() + 1,
        date: _value.date(),
        monthDates: setMonthDate(_value, (date) => this.disabledDate(date)),
        firstWeek: _value.startOf("month").day(),
        yearMonthValue: setYearMonth(this.data.years, _value),
      });
    },
  },
});

export interface MonthDate {
  date: number;
  month: number;
  year: number;
  value: string;
  disabled: boolean;
}

function setMonthDate(
  day: Dayjs,
  disabled: (date: MonthDate) => boolean
): MonthDate[] {
  return new Array(day.endOf("month").date()).fill(null).map((_, index) => {
    const date = day.startOf("month").add(index, "day");
    const item = {
      date: date.get("date"),
      month: date.get("month") - 1,
      year: date.get("year"),
      value: date.format("YYYY-MM-DD"),
      disabled: false,
    };
    return {
      ...item,
      disabled: disabled(item),
    };
  });
}

function setYears(day: Dayjs) {
  const start = day.year() - 50;
  return new Array(100).fill(null).map((_, index) => {
    return start + index;
  });
}

function setYearMonth(years: number[], day: Dayjs) {
  return [years.findIndex((item) => item === day.year()), day.month()];
}

function getYearMonth(years: number[], indexes: number[]) {
  const [yearIndex, monthIndex] = indexes;
  const year = years[yearIndex];
  const month = monthIndex + 1;
  const _value = dayjs(`${year}-${month}`, "YYYY-MM");
  return _value;
}
