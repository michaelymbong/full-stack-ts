import { favoriteTransform, tweetTransform } from '../transforms';
import { TwitterResolverContext } from '../resolvers';
import { MutationResolvers } from '../resolvers-types.generated';

const mutationTwitterResolver: MutationResolvers<TwitterResolverContext> = {
  async createTweet(_parent, args, { dbTweetCache, dbUserCache, db }) {
    const { body, userId } = args;
    const dbTweet = await db.createTweet({
      message: body,
      userId,
    });

    // this populates dbTweetCache
    const dbTweetMap = (dbTweetCache ||= {});
    dbTweetMap[dbTweet.id] = dbTweet;

    const dbAuther = db.getUserById(userId);

    // this populates dbUserCache
    const dbUserMap = (dbUserCache ||= {});
    dbUserMap[userId] = dbAuther;

    if (!dbAuther) {
      throw new Error(`No author found for user ${userId}`);
    }

    return Object.assign(tweetTransform(dbTweet), { auther: dbAuther });
  },
  async createFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fav = await db.createFavorite(favorite);
    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      tweet: tweetTransform(db.getTweetById(fav.tweetId)),
    };
  },
  async deleteFavorite(_parent, args, { db }) {
    const { favorite } = args;
    const fav = await db.deleteFavorite(favorite);
    return {
      ...favoriteTransform(fav),
      user: db.getUserById(fav.userId),
      tweet: tweetTransform(db.getTweetById(fav.tweetId)),
    };
  },
};

export default mutationTwitterResolver;
