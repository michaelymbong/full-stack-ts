import Db, { DbTweet, DbUser } from './db';
import { Resolvers } from './resolvers-types.generated';
import queryTwitterResolvers from './resolvers/Query';

export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

const resolvers: Resolvers<TwitterResolverContext> = {
  Query: queryTwitterResolvers,
};

export default resolvers;
