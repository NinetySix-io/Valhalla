export interface GqlContext {
  req: Request;
  res: Response;
  payload?: GqlContextPayload;
  // required for subscription
  connection: unknown;
}
