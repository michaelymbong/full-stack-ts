import { TwitterResolverContext } from '../resolvers';
import { favoriteTransform, tweetTransform } from '../transforms';
import { UserResolvers } from '../resolvers-types.generated';
const userTwitterResolver: UserResolvers<TwitterResolverContext> = {
  stats(user, _, { db }) {
    return {
      followingCount: 123, // temp data
      followerCount: 456789, // temp data
      tweetCount: db.getUserTweets(user.id).length,
    };
  },
  favorites(user, _, { db }) {
    const faves = db.getUserFavorites(user.id);
    return faves.map((f) => {
      return {
        ...favoriteTransform(f),
        user,
        tweet: tweetTransform(db.getTweetById(f.tweetId)),
      };
    });
  },
};
export default userTwitterResolver;
