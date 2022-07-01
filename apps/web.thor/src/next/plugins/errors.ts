export class NextPluginError extends Error {
  constructor(msg?: string) {
    super(`[NextPluginError] ${msg}`);
  }
}

export class NextPluginNotSsrError extends NextPluginError {
  constructor(msg?: string) {
    super(msg);
  }
}
