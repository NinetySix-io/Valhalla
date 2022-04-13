import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../types/jwt.payload';
import { JwtService as Service } from '@nestjs/jwt/dist/jwt.service';
import { UserSchema } from '@odin/data.models/users/schema';

@Injectable()
export class JwtService {
  constructor(private readonly service: Service) {}

  signToken(user: Pick<UserSchema, '_id'>): string {
    const payload: JwtPayload = {
      user: user._id.toHexString(),
    };

    return this.service.sign(payload);
  }

  verifyToken(token: string): Promise<JwtPayload> {
    return this.service.verify(token);
  }
}
