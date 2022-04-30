import Mutation from './resolvers/Mutation';
import Tweet from './resolvers/Tweet';
import Query from './resolvers/Query';
import User from './resolvers/User';
import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  Mutation,
  Tweet,
  User,
};

export default resolvers;
