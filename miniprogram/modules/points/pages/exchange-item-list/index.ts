import { getExchangeList } from "../../../../services/points";

Page({
  data: {
    list: [],
    hasMore: false,
    showError: false,
    errorType: "",
    errorMsg: "",
  },
  pageNo: 1,
  status: "",
  searchKey: "",
  isLoading: false,
  onLoad() {
    this.pageNo = 1;
    this.status = "";
    this.searchKey = "";
  },
  onPulling() {
    this.pageNo = 1;
  },
  onRefresh() {
    this.loadData();
  },
  onSearch(e: WechatMiniprogram.CustomEvent<{ searchKey: string }>) {
    this.pageNo = 1;
    this.searchKey = e.detail.searchKey;
    this.selectComponent("#exchange-list-refresher").pulling();
  },
  onTabChange(e: WechatMiniprogram.CustomEvent<{ key: string }>) {
    this.pageNo = 1;
    this.status = e.detail.key;
    this.selectComponent("#exchange-list-refresher").pulling();
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
      const { hasMore, list } = await getExchangeList({
        status: this.status,
        searchKey: this.searchKey,
        pageNo: this.pageNo,
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
        errorType: err.errorType,
        errorMsg: err.errorMsg,
      });
    } finally {
      this.selectComponent("#exchange-list-refresher").done();
    }
  },
});
