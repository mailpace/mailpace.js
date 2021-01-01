export type SendResponse = {
  readonly id: number;
  readonly status: string;
};

export type ErrorResponse = {
  readonly error?: string;
  readonly errors?: object;
};
