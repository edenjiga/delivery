import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MODEL_NAMES } from '@/constants';
import { IUserDoc } from '@/models';
import { Model } from 'mongoose';
import { CreditCard, IUser } from '@/shared';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(MODEL_NAMES.USERS) private userModel: Model<IUserDoc>,
  ) {}

  public save(data) {
    const user = new this.userModel(data);
    return user.save();
  }

  public addCreditCardByUserId(id: string, creditCard: CreditCard) {
    return this.userModel.findByIdAndUpdate(id, {
      $push: { creditCards: creditCard },
    });
  }

  public findOneAndUpdate(query, newData: IUser) {
    return this.userModel.findOneAndUpdate(query, newData);
  }

  public findOneAndUpdateOrCreate(query, newData) {
    return this.userModel.findOneAndUpdate(query, newData, { upsert: true });
  }

  public findOne(query) {
    return this.userModel.findOne(query);
  }

  public findByIdAndUpdate(id: string, body) {
    return this.userModel.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
    });
  }

  public findById(id: string) {
    return this.userModel.findById(id);
  }
}
