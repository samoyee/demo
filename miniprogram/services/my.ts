import { Patient } from "./patient";

export interface MyResponse {
  patientList: Patient[];
  score: number;
}

export function my(): Promise<MyResponse> {
  return getApp().fetch.post("/my", undefined, {
    needLogin: true,
    needJumpLoginPage: true,
  });
}
