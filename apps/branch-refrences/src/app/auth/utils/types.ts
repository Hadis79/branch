export interface VerifyResponse {
  nationalId: string;
  cellphoneNumber: string;
  captcha: string;
}

export interface OtpResponse {
  mobileNumber: string;
}

export interface captchaResponse {
  captcha: string;
}

export interface ValidateResponse {
  otp: string;
}

export interface CardListResponse {
  userSSN: string;
}

export interface CardOtpResponse {
  panNo: string;
  cvv2: string;
  expDate: string;
}

export interface CardVerifyResponse {
  panNo: string;
  cvv2: string;
  expDate: string;
  otp: string;
}
