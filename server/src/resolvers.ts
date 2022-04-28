import tweetTwitterResolver from './resolvers/Tweet';
import queryTwitterResolvers from './resolvers/Query';
import userTwitterResolver from './resolvers/User';
import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query: queryTwitterResolvers,
  Tweet: tweetTwitterResolver,
  User: userTwitterResolver,
};

export default resolvers;
