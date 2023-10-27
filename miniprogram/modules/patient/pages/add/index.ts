import { addPatient, getPatient } from "../../../../services/patient";

Page({
  data: {
    showError: false,
    errorType: "",
    errorMsg: "",
  },
  query: {},
  onLoad(query) {
    this.query = query;
    if (this.query.patientId) {
      this.loadData();
    }
  },
  async onSubmit() {
    try {
      const values = await this.selectComponent("#patient-form").validate();
      const data = await addPatient(values);
      wx.showToast({
        title: data.message,
        icon: "none",
        complete() {
          const timer = setTimeout(() => {
            clearTimeout(timer);
            if (data.code === "SUCCESS") {
              wx.navigateBack();
            }
          }, 1000);
        },
      });
    } catch (err) {
      wx.showToast({ title: err.message, icon: "none" });
    }
  },
  async loadData() {
    try {
      const data = await getPatient({ patientId: this.query.patientId });
      this.setData({ showError: false });
      this.selectComponent("#patient-form").setFieldsValue(data);
    } catch (err) {
      this.setData({
        showError: true,
        errorType: err.code,
        errorMsg: err.message,
      });
    }
  },
  refresh() {
    this.loadData();
  },
});
