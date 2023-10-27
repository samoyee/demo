interface TabData {
  name: string;
  subTabs?: TabData[];
  list?: any[];
  remark?: string;
}

const tabData: TabData[] = [
  {
    name: "手术项目",
    subTabs: [
      {
        name: "飞秒技术",
        list: [
          {
            name: "美国Alcon飞秒老视矫正手术",
            price: "26000",
            unit: "双眼",
          },
          {
            name: "德国VisuMax全飞秒手术",
            price: "25000",
            unit: "双眼",
          },
          {
            name: "美国Alcon飞秒Q值引导、波前引导、地形图引导、T-PRK手术",
            price: "23500",
            unit: "双眼",
          },
          {
            name: "美国 Alcon飞秒波前优化手术（个性化、kappa角补偿）",
            price: "21800",
            unit: "双眼",
          },
          {
            name: "美国Alcon飞秒波前优化手术（普通型）",
            price: "18500",
            unit: "双眼",
          },
          {
            name: "德国VisuMax半飞秒手术",
            price: "16000",
            unit: "双眼",
          },
        ],
      },
      {
        name: "板层刀技术",
        list: [
          {
            name: "美国Alcon波前优化Lasik手术",
            price: "11000",
            unit: "双眼",
          },
          {
            name: "美国Visx超薄常规Lasik手术",
            price: "6500",
            unit: "双眼",
          },
        ],
      },
      {
        name: "晶体植入术",
        list: [
          {
            name: "ICL-V4c手术（中心孔后房屈光型人工晶状体）",
            price: "16000",
            unit: "单眼",
          },
          {
            name: "飞秒ICL-V4c手术（中心孔后房屈光型人工晶状体）",
            price: "26000",
            unit: "单眼",
          },
          {
            name: "TICL-V4c手术（中心孔后房散光屈光型人工晶状体）",
            price: "19000",
            unit: "单眼",
          },
          {
            name: "PC-PRL手术（后房屈光悬浮型人工晶状体）",
            price: "19000",
            unit: "单眼",
          },
          {
            name: "飞秒TICL-V4c手术（中心孔后房散光屈光型人工晶状体）",
            price: "29000",
            unit: "单眼",
          },
        ],
      },
      {
        name: "晶体置换术",
        list: [
          {
            name: "飞秒+屈光性防蓝光三焦散光IOL手术",
            price: "65600",
            unit: "单眼",
          },
          {
            name: "飞秒+屈光性防蓝光三焦IOL手术",
            price: "59900",
            unit: "单眼",
          },
          {
            name: "飞秒+屈光性三焦IOL手术",
            price: "49800",
            unit: "单眼",
          },
          {
            name: "飞秒+屈光性双焦散光IOL手术",
            price: "49800",
            unit: "单眼",
          },
          {
            name: "飞秒+屈光性双焦IOL手术",
            price: "39800",
            unit: "单眼",
          },
          {
            name: "飞秒+屈光性单焦散光IOL手术",
            price: "39800",
            unit: "单眼",
          },
          {
            name: "飞秒+屈光性单焦IOL手术",
            price: "29600",
            unit: "单眼",
          },
        ],
      },
    ],
  },
  {
    name: "特殊项目",
    list: [
      {
        name: "飞秒激光补晶体植入检查",
        unit: "双眼",
        price: "500",
      },
      {
        name: "术后二次增效手术检查和咨询",
        unit: "双眼",
        price: "3500",
      },
      {
        name: "术后二次增效手术",
        unit: "单眼",
        price: "24000",
      },
      {
        name: "瓣皱折、上皮植入、瓣游离复位手术",
        unit: "单眼",
        price: "3000",
      },
      {
        name: "Nd:YAG激光（后发性白内障）",
        unit: "单眼",
        price: "1000",
      },
      {
        name: "干眼治疗（双眼3次为一疗程）",
        unit: "疗程",
        price: "3600",
      },
    ],
  },
  {
    name: "检查和治疗项目",
    list: [
      {
        name: "飞秒近视激光术前检查",
        unit: "双眼",
        price: "350",
      },
      {
        name: "晶体植入术前检查",
        unit: "双眼",
        price: "850",
      },
      {
        name: "IOL术前检查",
        unit: "双眼",
        price: "850",
      },
      {
        name: "少儿屈光常规检查",
        unit: "双眼",
        price: "100",
      },
      {
        name: "OK镜全套屈光检查",
        unit: "双眼",
        price: "350",
      },
      {
        name: "干眼全套检查",
        unit: "双眼",
        price: "350",
      },
      {
        name: "VIP视力健康检查套餐",
        unit: "双眼",
        price: "2000",
      },
      {
        name: "全麻",
        unit: "人次",
        price: "19990",
      },
      {
        name: "高度近视基因检测",
        unit: "人次",
        price: "1980",
      },
      {
        name: "Visx波前检查",
        unit: "人次",
        price: "500",
      },
      {
        name: "Alcon波前检查",
        unit: "人次",
        price: "500",
      },
      {
        name: "非接触眼压测量",
        unit: "人次",
        price: "20",
      },
      {
        name: "角膜厚度测量",
        unit: "人次",
        price: "100",
      },
      {
        name: "眼轴长度测量",
        unit: "人次",
        price: "100",
      },
      {
        name: "电脑验光检查",
        unit: "人次",
        price: "20",
      },
      {
        name: "主觉验光检查",
        unit: "人次",
        price: "20",
      },
      {
        name: "裂隙灯检查",
        unit: "人次",
        price: "10",
      },
      {
        name: "眼底检查",
        unit: "人次",
        price: "30",
      },
      {
        name: "红外线瞳孔大小测量",
        unit: "人次",
        price: "10",
      },
      {
        name: "Alcon-角膜地形图",
        unit: "人次",
        price: "200",
      },
      {
        name: "Orbscan-Ⅱ角膜地形图",
        unit: "人次",
        price: "200",
      },
      {
        name: "Modi Sirius角膜地形图",
        unit: "人次",
        price: "200",
      },
      {
        name: "Zeiss OCT",
        unit: "人次",
        price: "200",
      },
      {
        name: "Zeiss IOL Master 700",
        unit: "人次",
        price: "200",
      },
      {
        name: "裂隙灯眼前节分析系统检查",
        unit: "人次",
        price: "100",
      },
      {
        name: "眼科超声生物显微镜（UBM）",
        unit: "人次",
        price: "200",
      },
      {
        name: "单独手术开机费",
        unit: "人次",
        price: "5000",
      },
      {
        name: "虚拟镜片费",
        unit: "双眼",
        price: "3000",
      },
      {
        name: "角膜营养不良基因检测2项",
        unit: "双眼",
        price: "1200",
      },
      {
        name: "角膜营养不良基因检测5项",
        unit: "双眼",
        price: "3000",
      },
    ],
  },
  {
    name: "角膜塑形镜",
    list: [
      {
        name: "菲士康RGP",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤1000",
            price: "1800",
          },
          {
            labelValue: "1025 ~ 1500",
            price: "2000",
          },
          {
            labelValue: "1525 ~ 2000",
            price: "2800",
          },
        ],
      },
      {
        name: "菲士康圆锥RGP",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤2000",
            price: "4800",
          },
        ],
      },
      {
        name: "梦戴维",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤200",
            price: "5400",
          },
          {
            labelValue: "225 ~ 400",
            price: "6400",
          },
          {
            labelValue: "425 ~ 600",
            price: "7400",
          },
        ],
      },
      {
        name: "梦戴维（等离子处理）",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤200",
            price: "6800",
          },
          {
            labelValue: "225 ~ 400",
            price: "7800",
          },
          {
            labelValue: "425 ~ 600",
            price: "8800",
          },
        ],
      },
      {
        name: "荷兰MCT",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤200",
            price: "8800",
          },
          {
            labelValue: "225 ~ 400",
            price: "9800",
          },
          {
            labelValue: "425 ~ 600",
            price: "10800",
          },
        ],
      },
      {
        name: "美国CRT",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤600",
            price: "10900",
          },
        ],
      },
      {
        name: "美国CRT（特殊订制）",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤600",
            price: "12900",
          },
        ],
      },
      {
        name: "日本α",
        label: "度数或压力",
        list: [
          {
            labelValue: "≤200",
            price: "10500",
          },
          {
            labelValue: "225 ~ 400",
            price: "11500",
          },
          {
            labelValue: "425 ~ 600",
            price: "12500",
          },
        ],
      },
      {
        name: "视界多焦软镜（日抛）",
        label: "度数或压力",
        list: [
          {
            labelValue: "100 ~ 800",
            price: "80",
          },
        ],
      },
    ],
    remark: `①仅菲士康品牌按照压力计算，其他品牌全部按照度数计算。\n
    　　　②散光片处理需增加1000元/片。\n
    　　　③碎片：1个月内可享受6折；3个月内可享受7折；6个月内可享受8折（需归还＞50%的碎片）\n
    　　　④多焦软镜：30片/盒为单位，不单片销售。`,
  },
];

Page({
  data: {
    tabs: tabData,
    subTabs: tabData?.[0].subTabs || [],
    activeTabIndex: 0,
    activeSubTabIndex: 0,
    list: tabData?.[0]?.subTabs?.[0]?.list || tabData?.[0]?.list || [],
  },
  onTabChange(e: WechatMiniprogram.CustomEvent) {
    const { index, item } = e.detail || {};
    this.setData({
      subTabs: item?.subTabs || [],
      activeTabIndex: index,
      activeSubTabIndex: 0,
      list: item?.subTabs?.[0]?.list || item?.list || [],
    });
  },
  onSubTabChange(e: WechatMiniprogram.CustomEvent) {
    const { index, item } = e.detail || {};
    this.setData({
      activeSubTabIndex: index,
      list: item?.list || [],
    });
  },
});
