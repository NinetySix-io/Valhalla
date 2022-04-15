export type ComponentProps<T extends { [key as string]: any }> = T & {
  className?: string;
  id?: string;
};
