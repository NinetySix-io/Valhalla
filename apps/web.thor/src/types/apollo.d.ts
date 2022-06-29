export type ModGraphQLErrorExtensions = {
  code: 'FORBIDDEN' | 'UNAUTHORIZED';
  response: {
    error: string;
    message: string;
    statusCode: number;
  };
};
