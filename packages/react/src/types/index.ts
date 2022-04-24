export type ComponentProps<
  T extends Record<string, any> = Record<string, any>
> = T & {
  className?: string;
  id?: string;
};
