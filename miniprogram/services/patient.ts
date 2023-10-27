export enum Gender {
  M = "男",
  F = "女",
}

export enum IsDry {
  YES = 1,
  NO = 0,
}

export enum IsKeratitis {
  YES = 1,
  NO = 0,
}

export enum Decline {
  ONE_YEAR_LOWER = 0,
  ONE_TO_FIVE_YEAR = 1,
  FIVE_TO_TEN_YEAR = 5,
  TEN_YEAR_UPPER = 10,
}

export enum WearGlass {
  NO_GLASSES = "0",
  FRAME_GLASSES = "1",
  SOFT_CONTACT_LENSES = "2",
  HARD_CONTACT_LENSES = "3",
}

export interface Patient {
  patientId: string;
  name: string;
  gender: Gender;
  birthday: string;
  idCard: string;
  idCardSecret: string;
  occupation: string;
  address: string;
  addressName: string;
  age: number;
  phoneNumber: string;
  remark: string;
  status: unknown;
  userId: number;
  wx: unknown;
}

export interface AddPatientRequest {
  name: string;
  gender: Gender;
  birthday: string;
  idCard?: string;
  occupation?: string;
  address?: string;
}

export interface AddPatientResponse {
  code: "SUCCESS" | "FAIL";
  message: string;
}

export function addPatient(
  param: AddPatientRequest
): Promise<AddPatientResponse> {
  return getApp().fetch.post("/patient/saveOrUpdate", param);
}

export interface GetPatientRequest {
  patientId: string;
}

export interface GetPatientResponse extends Patient {}

export function getPatient(
  param: GetPatientRequest
): Promise<GetPatientResponse> {
  return getApp().fetch.get("/patient/detail", { query: param });
}

export interface GetPatientHistoryRequest {
  patientId: string;
}

export interface GetPatientHistoryResponse extends Patient {
  id: number;
  allergyHistory: string;
  bodyHistory: string;
  decline: Decline;
  dry: IsDry;
  eyeHistory: string;
  keratitis: IsKeratitis;
  mentalHistory: string;
  otherHistory: string;
  wearGlass: WearGlass;
}

export function getPatientMedicalHistory(
  param: GetPatientHistoryRequest
): Promise<GetPatientHistoryResponse> {
  return getApp().fetch.get("/patient/medicalHistoryDetail", { query: param });
}

export interface AddPatientHistoryRequest {
  id: number;
  patientId: string;
  allergyHistory: string;
  bodyHistory: string;
  decline: Decline;
  dry: IsDry;
  eyeHistory: string;
  keratitis: IsKeratitis;
  mentalHistory: string;
  otherHistory: string;
  wearGlass: WearGlass;
}

export interface AddPatientHistoryResponse {
  code: "SUCCESS" | "FAIL";
  message: string;
}

export function addPatientMedicalHistory(
  param: AddPatientHistoryRequest
): Promise<AddPatientHistoryResponse> {
  return getApp().fetch.post("/patient/saveOrUpdateMedicalHistory", param);
}
