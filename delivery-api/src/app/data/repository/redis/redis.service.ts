import environment from '@/environment';
import { Injectable, Logger } from '@nestjs/common';
import * as redis from 'redis';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  private logger: Logger = new Logger('RedisService');

  private client: redis.RedisClient;

  getAsync;

  constructor() {
    this.client = redis.createClient(environment.redis.URL);

    this.client.on('connect', () => this.logger.log('Redis connected'));
    this.client.on('reconnecting', () => this.logger.log('Redis reconnecting'));
    this.client.on('error', () => this.logger.error('Redis error'));
    this.client.on('end', () => this.logger.error('Redis end'));

    this.getAsync = promisify(this.client.get).bind(this.client);
  }

  public get(key): Promise<string> {
    return this.getAsync(key);
  }
}
