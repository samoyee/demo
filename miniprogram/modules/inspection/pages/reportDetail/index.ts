import { getReportDetail } from "../../../../services/inspection";

Page({
  data: {
    data: null,
    showError: false,
    errorType: "",
    errorMsg: "",
  },

  onLoad(query) {
    this.query = query;
    this.loadData();
  },

  loadData() {
    getReportDetail(this.query)
      .then((data) => {
        this.setData({
          data,
          showError: false,
        });
      })
      .catch((err) => {
        this.setData({
          data: null,
          showError: true,
          errorType: err.code,
          errorMsg: err.message,
        });
      });
  },
});
