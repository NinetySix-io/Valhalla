export class EntityNotFoundException extends Error {
  constructor(msg?: string) {
    super(`[EntityNotFoundException] ${msg}`);
  }
}

export const throwEntityNotFound = () => new EntityNotFoundException();
