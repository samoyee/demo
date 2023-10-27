export interface ReportListRequest {
  pageNo: number;
  pageSize: number;
  patientId: string;
  status: string;
}

export interface ReportItem {
  examDate: string;
  examId: number;
  eye: string;
  name: string;
  type: "NORMAL";
}

export interface ReportListResponse {
  list: ReportItem[];
  hasMore: boolean;
}

export function getReportList(
  param: ReportListRequest
): Promise<ReportListResponse> {
  const { pageNo, pageSize, ...restParam } = param;
  return getApp().fetch.post("/inspection/reportList", restParam, {
    query: {
      pageNo,
      pageSize,
    },
  });
}

export interface ReportItemRequest {
  type: string;
  examId: string;
}

interface LabelValue {
  label?: string;
  value: string;
}

export interface Item {
  label: string;
  left: LabelValue[];
  right: LabelValue[];
}

export interface ReportItemResponse {
  dominant: string;
  items: Item[];
}

export function getReportDetail(param: ReportItemRequest) {
  return getApp().fetch.get("/inspection/reportDetail", { query: param });
}
