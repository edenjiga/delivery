import { MODEL_NAMES } from '@/constants';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISuggestionsDoc } from '@/models/suggestions';

@Injectable()
export class SuggestionsRepository {
  // private logger: Logger = new Logger('SeggestionsRepository');

  constructor(
    @InjectModel(MODEL_NAMES.SUGGESTIONS)
    private suggestionModel: Model<ISuggestionsDoc>,
  ) {}

  public save(data) {
    const suggestions = new this.suggestionModel(data);
    return suggestions.save();
  }
}
