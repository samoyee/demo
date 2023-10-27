import { getReportList } from "../../../../services/inspection";

Page({
  data: {
    list: [],
    hasMore: false,
    showError: false,
    errorType: "",
    errorMsg: "",
  },
  onLoad(query) {
    this.query = query;
    this.pageNo = 1;
    this.status = "";
  },
  onPulling() {
    this.pageNo = 1;
  },
  onRefresh() {
    this.loadData();
  },
  onTabChange(e: WechatMiniprogram.CustomEvent<{ key: string }>) {
    this.pageNo = 1;
    this.status = e.detail.key;
    this.selectComponent("#report-list-refresher").pulling();
  },
  onLoadmore() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.pageNo++;
    this.loadData(true).then(() => {
      this.isLoading = false;
    });
  },
  async loadData(isLoadMore: boolean = false) {
    try {
      const { list, hasMore } = await getReportList({
        pageNo: this.pageNo,
        pageSize: 10,
        patientId: this.query.patientId,
        status: this.status,
      });
      if (!isLoadMore && !hasMore && list.length === 0) {
        throw {
          errorType: "EMPTY_DATA",
          errorMsg: "",
        };
      }
      this.setData({
        list: isLoadMore ? this.data.list.concat(list) : list,
        hasMore,
        showError: false,
      });
    } catch (err) {
      this.setData({
        list: [],
        hasMore: false,
        showError: true,
        errorType: err.code,
        errorMsg: err.message,
      });
    } finally {
      this.selectComponent("#report-list-refresher").done();
    }
  },
});
