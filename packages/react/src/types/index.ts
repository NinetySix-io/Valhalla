export type ComponentProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  className?: string;
  id?: string;
};
