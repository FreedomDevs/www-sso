export interface ConfirmEmailRequest {
  email_verefication_token: string;
  code: string;
}