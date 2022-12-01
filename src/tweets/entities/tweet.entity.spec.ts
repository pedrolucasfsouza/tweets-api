import mongoose from 'mongoose';
import { Tweet, TweetSchema } from './tweet.entity';

describe('Tweet Tests', () => {
  describe('Tweet Class', () => {
    it('should create a new tweet', () => {
      const tweet = new Tweet({
        content: 'Hello World',
        screen_name: 'Pedro Lucas',
      });
      expect(tweet.content).toBe('Hello World');
      expect(tweet.screen_name).toBe('Pedro Lucas');
    });
  });

  describe('using MongoDB', () => {
    let conn: mongoose.Mongoose;

    beforeEach(async () => {
      conn = await mongoose.connect(
        'mongodb://root:root@localhost:27017/tweets_entity_test?authSource=admin',
      );
    });

    afterEach(async () => {
      await conn.disconnect();
    });
    it('create a new tweet document', async () => {
      const TweetModel = conn.model('Tweet', TweetSchema);

      const tweet = new TweetModel({
        content: 'Olá Mundo',
        screen_name: 'Pedro Lucas',
      });

      await tweet.save();

      const TweetCreated = await TweetModel.findById(tweet._id);

      expect(TweetCreated.content).toBe('Olá Mundo');
    });
  });
});
