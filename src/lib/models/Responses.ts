export interface SendResponse {
  id: number;
  status: string;
}

export interface ErrorResponse {
  error?: string;
  errors?: object;
}
