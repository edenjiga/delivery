import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/data';
import { CreateOrderCreditCard, CreateUserDto } from '@/shared';
import { checkField } from '@/shared/utils/checkField';
import { bcrypt } from '@/shared/utils';
import { UserPublicFields, CreditCard } from '@edenjiga/delivery-common';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  public createUser(body: CreateUserDto) {
    return this.userRepository.save(body);
  }

  public createOrUpdateUserByPhone(
    phone: string,
    body: Omit<UserPublicFields, '_id' | 'address'>,
  ) {
    const query = { phone };
    return this.userRepository.findOneAndUpdateOrCreate(query, body);
  }

  findByToken(token: string) {
    return this.userRepository.findOne({ token });
  }

  public async findOrAddCreditCardByUserId(
    id: string,
    creditCard: CreateOrderCreditCard,
  ): Promise<CreditCard> {
    if (creditCard && creditCard.name) {
      if (
        checkField(creditCard, 'paymentSourceId') &&
        checkField(creditCard, 'expiresAt') &&
        checkField(creditCard, 'status')
      ) {
        await this.userRepository.addCreditCardByUserId(id, creditCard);
        return creditCard;
      } else {
        const { creditCards } = await this.userRepository.findById(id);
        return creditCards.find(({ name }) => name === creditCard.name);
      }
    }
  }

  public findById(id) {
    return this.userRepository.findById(id);
  }

  public findByPhoneAndUpdate(phone: string, body: UserPublicFields) {
    const query = { phone };
    return this.userRepository.findOneAndUpdate(query, body);
  }

  public findUserByPhone(phone: string) {
    const query = { phone };
    return this.userRepository.findOne(query);
  }

  public findByIdAndUpdate(id, body: UserPublicFields) {
    return this.userRepository.findByIdAndUpdate(id, body);
  }

  public findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  public async addCreditCardByUserId(id, creditCard: CreditCard) {
    const user = await this.userRepository.findById(id);
    user.creditCards.push(creditCard);
    return user.save();
  }

  public async getUserCreditCardsByUserId(id: string) {
    const user = await this.userRepository.findById(id);
    return user.creditCards;
  }

  public updateToken(id: string, token: string) {
    return this.userRepository.findByIdAndUpdate(id, { token });
  }

  public async updatePassword(id: string, newPassword) {
    const password = await bcrypt.hashPassword(newPassword);
    return this.userRepository.findByIdAndUpdate(id, { password });
  }
}
