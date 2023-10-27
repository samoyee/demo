import { Patient } from "./patient";

export interface Project {
  projectId: number;
  projectName: string;
  allowAppointWeeks: string;
  attention: string;
  maxAfternoon: number;
  maxMorning: number;

  maxAge: number;
  minAge: number;
  remark: string;
  status: unknown;
}

export interface AppointData {
  appointId: number;
  appointDate: string;
  appointTime: "0" | "1";
  attention: string;
  noticeRemark: string;
  projectId: number;
  projectName: string;
  patientId: number;
  name: string;
  phoneNumber: string;
  remark: string;
  status: "APPOINT_SUCCESS";
  openId: string;
  tempId: string;
  userId: 2;
}

export interface AppointResponse {
  projects: Project[];
  patients: Patient[];
  appointData: AppointData;
}

export function getAppoint(): Promise<AppointResponse> {
  return getApp().fetch.get("/appoint", {
    showLoading: true,
    needLogin: true,
    needJumpLoginPage: true,
  });
}

export interface SubmitAppointRequest {
  name: string;
  appointDate: string;
  appointTime: number;
  patientId: number;
  projectId: number;
}

export interface SubmitAppointResponse {
  code: number;
  message: string;
}

export function submitAppoint(
  param: SubmitAppointRequest
): Promise<SubmitAppointResponse> {
  return getApp().fetch.post("/appoint/add", param);
}

export interface CancelAppointRequest {
  appointId: number;
}

export interface CancelAppointResponse {
  code: "SUCCESS" | "FAIL";
  message: string;
}

export function cancelAppoint(
  params: CancelAppointRequest
): Promise<CancelAppointResponse> {
  return getApp().fetch.post("/appoint/cancel", params);
}
