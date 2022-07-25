export type BaseElement<Type> = {
  type: Type;
  width: number;
  height: number;
};

export type TextBuilderElement = BaseElement<'Text'>;
export type ButtonBuilderElement = BaseElement<'Button'>;
export type BuilderElement = TextBuilderElement | ButtonBuilderElement;
export type BuilderElementWithId = { id: string } & BuilderElement;
