export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type OneOrMany<T> = T | Array<T>;

export type ArrayElement<T> = T extends (infer U)[] ? U : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BasicObject<T = any> = {
  [key: string]: T;
};

export type ValueOf<T> = T[keyof T];
