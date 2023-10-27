import {
  cancelAppoint,
  getAppoint,
  Project,
  submitAppoint,
} from "../../services/appoint";
import { DateOption } from "./components/appoint-date/index";

Page({
  data: {
    showError: false,
    loading: true,
    errorType: "",
    errorMsg: "",

    appointData: null,
    projects: [],
    patients: [],
    times: [
      {
        label: "8:30-11:30",
        value: 0,
        disabled: false,
      },
      {
        label: "13:00-16:00",
        value: 1,
        disabled: false,
      },
    ],
    projectId: -1,
    appointDate: "",
    appointTime: -1,
    name: "",
  },
  query: {},
  onLoad(query) {
    this.query = query;
    this.loadData();
  },

  onProjectChange(e: WechatMiniprogram.CustomEvent) {
    const { value } = e.detail;
    this.setData({
      appointDate: "",
    });
    this.setAppointDate(value);
  },

  onNameChange() {
    this.patientId = undefined;
  },

  onPatientSelect(e: WechatMiniprogram.CustomEvent) {
    const { item } = (e.currentTarget || e.target).dataset;
    this.setData({
      name: item.label,
    });
    this.patientId = item.value;
  },

  onPhoneCall() {
    wx.makePhoneCall({ phoneNumber: "0571-85318888" });
  },

  refresh() {
    this.loadData();
  },

  async onSubmit() {
    try {
      const { projectId, name, appointDate, appointTime } = this.data;
      if (projectId < 0) {
        wx.showToast({ title: "请选择需要预约的项目", icon: "none" });
        return;
      }
      if (!appointDate || appointTime < 0) {
        wx.showToast({ title: "请选择需要预约的日期和时间", icon: "none" });
        return;
      }
      if (!name) {
        wx.showToast({ title: "请填写就诊人姓名", icon: "none" });
        return;
      }

      const { message } = await submitAppoint({
        projectId,
        name,
        appointDate,
        appointTime,
        patientId: this.patientId,
      });
      wx.showToast({ title: message, icon: "none" });
      setTimeout(() => {
        wx.switchTab({ url: "/pages/index/index" });
      }, 1000);
    } catch (err) {
      wx.showToast({ title: err.message, icon: "none" });
    }
  },

  onCancel() {
    const { appointData = { appointId: -1 } } = this.data;
    if (appointData && appointData.appointId > -1) {
      wx.showModal({
        title: "确认要取消预约吗？",
        success: ({ confirm }) => {
          if (confirm) {
            cancelAppoint({ appointId: appointData.appointId }).then((res) => {
              wx.showToast({ title: res.message, icon: "none" });
              setTimeout(() => {
                wx.switchTab({ url: "/pages/index/index" });
              }, 500);
            });
          }
        },
      });
    }
  },

  async loadData() {
    try {
      const { projects, patients, appointData } = await getAppoint();
      this.projects = projects;
      this.setData({
        loading: false,
        showError: false,
        projects: projects.map((item) => ({
          label: item.projectName,
          value: item.projectId,
        })),
        patients: patients.map((item) => ({
          label: item.name,
          value: item.patientId,
        })),
        appointData,
      });
    } catch (err) {
      this.setData({
        loading: false,
        showError: true,
        errorType: err.code,
        errorMsg: err.message,
      });
    }
  },

  /**
   * 设置不可预约的时间
   */
  async setAppointDate(projectId: number) {
    try {
      const project = this.projects?.find(
        (project: Project) => project.projectId === projectId
      );
      if (project) {
        const { allowAppointWeeks } = project;
        const list = allowAppointWeeks
          .split(",")
          .map((item: string) => +item % 7);
        this.selectComponent("#appoint-date").setDisabledDate(
          (currentDate: DateOption) => !list.includes(currentDate.week)
        );
      }
    } catch (err) {}
  },
});
