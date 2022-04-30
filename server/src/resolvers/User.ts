import { TwitterResolverContext } from '../resolvers';
import { UserResolvers } from '../resolvers-types.generated';
const userTwitterResolver: UserResolvers<TwitterResolverContext> = {
  stats(user, _, { db }) {
    return {
      followingCount: 123, // temp data
      followerCount: 456789, // temp data
      tweetCount: db.getUserTweets(user.id).length,
    };
  },
};
export default userTwitterResolver;
