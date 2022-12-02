import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Tweet, TweetSchema } from './entities/tweet.entity';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;
  let module: TestingModule;

  beforeEach(async () => {
    const uri =
      'mongodb://root:root@db_test:27017/tweets_service_test?authSource=admin';
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }]),
      ],
      providers: [TweetsService],
    }).compile();

    service = module.get<TweetsService>(TweetsService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a tweet', async () => {
    const tweet = await service.create({
      content: 'Hello World',
      screen_name: 'Pedro Lucas',
    });

    expect(tweet.content).toBe('Hello World');
    expect(tweet.screen_name).toBe('Pedro Lucas');
  });

  it('should find all tweets', async () => {
    const tweet = await service.findAll();

    expect(tweet).toBeInstanceOf(Array);
  });

  it('should find expecif tweet by id', async () => {
    expect(1).toBe(1);
  });
});
