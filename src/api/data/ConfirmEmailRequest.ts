export interface ConfirmEmailRequest {
  email_verification_token: string;
  code: string;
}