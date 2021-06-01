import { MODEL_NAMES } from '@/constants';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISuggestionsDoc } from '@/models/suggestions';
import { UpdateSuggestionDto } from '@edenjiga/delivery-common';

interface ISuggestionsModel extends Model<ISuggestionsDoc> {
  paginate(query, options): Promise<any>;
}

@Injectable()
export class SuggestionsRepository {
  // private logger: Logger = new Logger('SeggestionsRepository');

  constructor(
    @InjectModel(MODEL_NAMES.SUGGESTIONS)
    private suggestionModel: ISuggestionsModel,
  ) {}

  public save(data) {
    const suggestions = new this.suggestionModel(data);
    return suggestions.save();
  }

  public findByIdAndUpdate(id: string, body: UpdateSuggestionDto) {
    return this.suggestionModel.findByIdAndUpdate(id, body, {
      runValidators: true,
      new: true,
    });
  }

  public paginate(query: any, options: any) {
    return this.suggestionModel.paginate(query, options);
  }
}
