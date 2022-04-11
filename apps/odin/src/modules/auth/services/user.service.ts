import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { decode } from 'jsonwebtoken';

import { User } from '../models/user.interface';
import { UserSignupDto } from '../dto/user.signup';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async create(newUser: User | UserSignupDto): Promise<User> {
    const ObjectId = mongoose.Types.ObjectId;
    const roles = ['USER'];
    const userCount = await this.count();
    if (userCount === 0) {
      roles.push('ADMIN'); // the very first user will automatically get the ADMIN role
    }
    const userId = newUser?.userId || new ObjectId().toHexString(); // copy over the same _id when userId isn't provided (by local signup users)
    const createdUser = new this.userModel({
      ...newUser,
      roles,
      userId,
    });

    return await createdUser.save();
  }

  async count(): Promise<number> {
    return await this.userModel.countDocuments().exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel?.findById(id).exec();
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async findOne(userProperty): Promise<User> {
    return await this.userModel.findOne(userProperty).exec();
  }

  async link(userId: string, token: string, providerName: string) {
    let result;
    const decodedToken = decode(token) as User;
    const user = await this.userModel.findOne({ userId });
    console.log('link user2', user && decodedToken && providerName, user);
    if (user && decodedToken && providerName) {
      user[providerName] = decodedToken[userId];
      user.providers.push({
        providerId: decodedToken.userId,
        name: providerName,
      });
      result = await user.save();
    }
    return result;
  }

  async unlink(userId: string, providerName: string) {
    console.log('unlink userId', userId);
    const result = await this.userModel.findOneAndUpdate(
      { userId },
      {
        $unset: { [providerName]: true },
        $pull: { providers: { name: providerName } },
      },
      { new: true },
    );
    return result;
  }
}
