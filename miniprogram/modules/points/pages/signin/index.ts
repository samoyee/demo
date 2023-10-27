import dayjs from "dayjs";
import {
  getSigninPointCalendar,
  signinPointToday,
} from "../../../../services/points";

const now = dayjs();

Page({
  data: {
    today: now.format("YYYY-MM-DD"),
    currentMonth: now.format("YYYY-MM"),
    firstDay: now.startOf("month").get("day"),
    monthLengh: now.endOf("month").get("date"),
    signInNum: 0,
    activeDateMap: {},
    todaySignined: false,
    prevDisabled: false,
    nextDisabled: false,
    ruleVisible: false,
  },

  onLoad() {
    getSigninPointCalendar()
      .then((activeDateMap) => {
        let signInNum = 0;
        let cur = now.clone();
        while (activeDateMap[cur.format("YYYY-MM-DD")]) {
          signInNum++;
          cur = cur.subtract(1, "day");
        }
        this.setData({
          signInNum,
          activeDateMap,
          todaySignined: activeDateMap[this.data.today],
        });
      })
      .catch((err) => {});
  },

  handlePrevMonth() {
    const { currentMonth } = this.data;
    const prevMonth = dayjs(currentMonth, "YYYY-MM").subtract(1, "month");
    this.setData({
      prevDisabled: prevMonth.diff(now, "month") <= -2,
      nextDisabled: false,
      currentMonth: prevMonth.format("YYYY-MM"),
      firstDay: prevMonth.startOf("month").get("day"),
      monthLengh: prevMonth.endOf("month").get("date"),
    });
  },

  handleNextMonth() {
    const { currentMonth } = this.data;
    const nextMonth = dayjs(currentMonth, "YYYY-MM").add(1, "month");
    this.setData({
      prevDisabled: false,
      nextDisabled: nextMonth.diff(now, "month") >= 1,
      currentMonth: nextMonth.format("YYYY-MM"),
      firstDay: nextMonth.startOf("month").get("day"),
      monthLengh: nextMonth.endOf("month").get("date"),
    });
  },

  onPointSignin() {
    signinPointToday()
      .then(() => {
        this.onLoad();
      })
      .catch((err) => {});
  },

  openRule() {
    this.setData({
      ruleVisible: true,
    });
  },

  closeRule() {
    this.setData({
      ruleVisible: false,
    });
  },
});
