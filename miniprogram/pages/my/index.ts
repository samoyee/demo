import { my } from "../../services/my";
import { Patient } from "../../services/patient";

Page({
  data: {
    isLogin: false,
    showPatientSelectDialog: false,
    activePatientIndex: 0,
    score: 0,
    patientList: [] as Patient[],
  },
  needUpdate: true,
  onLoad() {
    this.loadData();
  },
  onShow() {
    getApp().emitter.emit("pageChange|app", "pages/my/index");
    this.loadData();
  },
  onHide() {
    this.needUpdate = true;
  },
  loadData() {
    if (!this.needUpdate) return;
    this.needUpdate = false;
    my()
      .then((result) => {
        const { activePatientIndex } = this.data;
        const { patientList, score } = result || {};
        this.setData({
          isLogin: !!getApp().auth.getAuthToken(),
          patientList: patientList || [],
          score,
          activePatientIndex: activePatientIndex || 0,
        });
      })
      .catch(() => {});
  },
  onOpenPatient() {
    this.setData({
      showPatientSelectDialog: true,
    });
  },
  onClosePatient() {
    this.setData({
      showPatientSelectDialog: false,
    });
  },
  onSelectPatient(e: WechatMiniprogram.CustomEvent) {
    const { index } = (e.currentTarget || e.target).dataset || {};
    this.setData({
      activePatientIndex: index,
      showPatientSelectDialog: false,
    });
  },
  logout() {
    getApp()
      .auth.logout()
      .then(() => {
        this.setData({
          isLogin: false,
          patientList: [],
          activePatientIndex: -1,
        });
      });
  },
});
