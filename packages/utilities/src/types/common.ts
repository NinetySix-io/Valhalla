export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type SingleOrMany<T> = T | Array<T>;

export type ArrayElement<T> = T extends (infer U)[] ? U : T;
