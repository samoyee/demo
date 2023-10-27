import dayjs from "dayjs";

const NORMAL_EXAM_FORM_BASE = [
  {
    label: "检查时间",
    name: "checkDate",
    type: "datetime",
    format: "yyyy-MM-DD HH:mm:ss",
  },
  {
    label: "主视眼",
    name: "dominant",
    type: "switch-radio",
    options: [
      { value: "右", label: "右眼" },
      { value: "左", label: "左眼" },
    ],
  },
];

const NORMAL_EXAM_FORM = [
  {
    label: "裸眼视力",
    name: "luoYanShiLi",
  },
  {
    label: "电脑验光",
    name: "dianNaoYanGuang",
  },
  {
    label: "瞳孔直径",
    name: "tongKongZhiJing",
  },
  {
    label: "眼压",
    name: "yanYa",
  },
  {
    label: "眼轴长度",
    name: "yanZhouChangDu",
  },
  {
    label: "主觉验光",
    name: "zhuJueYanGuang",
  },
  {
    label: "眼部检查",
    name: "yanBuJianCha",
  },
];

Page({
  data: {
    templates: NORMAL_EXAM_FORM,
    position: "right",
  },
  onLoad() {
    this.selectComponent("#zz-form").setFieldsValue({
      checkDate: dayjs().format("YYYY-MM-DD"),
      mainEye: "左",
    });
  },
  setPosition(e: WechatMiniprogram.CustomEvent) {
    const { position } = (e.currentTarget || e.target).dataset;
    this.setData({ position });
  },
  onSubmit() {
    Promise.all([
      this.selectComponent("#zz-form").validate(),
      this.selectComponent("#eye-form").validate(),
    ])
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.error(err);
      });
  },
});
