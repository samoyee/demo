import { listPointGoods } from "../../../../services/points";

Page({
  data: {
    list: [],
    hasMore: false,
    showError: false,
    errorType: "",
    errorMsg: "",
  },
  pageNo: 1,
  searchKey: "",
  isLoading: false,
  onLoad() {
    this.pageNo = 1;
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
    this.selectComponent("#shop-refresher").pulling();
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
      const { list, hasMore } = await listPointGoods({
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
      this.selectComponent("#shop-refresher").done();
    }
  },
});
