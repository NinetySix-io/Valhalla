import { Token } from '@app/protobuf';

export class TokenTransformer {
  private readonly value: string;
  private readonly expiresAt: Date;
  constructor(token: { value: string; expiresAt: Date }) {
    this.value = token.value;
    this.expiresAt = token.expiresAt;
  }

  get proto(): Token {
    return {
      value: this.value,
      expiresAt: this.expiresAt.toISOString(),
    };
  }
}
