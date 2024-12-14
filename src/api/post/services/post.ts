/**
 * post service
 */

import { factories } from "@strapi/strapi";

const UID = "api::post.post";

type AnyDocument = {
  documentId: string;
  id: number;
} & {
  [key: string]: any;
};

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
  async likePost(ctx: any, postId: string, userId: string) {
    const post = await strapi.db.query(UID).findOne({
      where: {
        documentId: postId,
      },
      populate: { user_likes: true },
    });

    if (!post) {
      ctx.notFound();
      return false;
    }

    const userLikePost = post.user_likes.some((userLike) => userLike.documentId === userId);

    const userRelation = {
      [userLikePost ? "disconnect" : "connect"]: [userId],
    };

    await strapi.service(UID).update(postId, {
      data: {
        user_likes: userRelation,
      },
    });
  },

  premiumPostsAccess(credentials, query: Record<string, Record<string, string>>) {
    let filters: Record<string, string> = query.filters || {};
    if (credentials && credentials?.role.name === "Guest Post") {
      filters.premium = "true";
    } else {
      filters.premium = "false";
    }

    return { ...query, filters };
  },

  // Method 1: Creating an entirely custom service
  async exampleService() {
    console.log("example service called");
    let response = { okay: true };

    if (response.okay === false) {
      return { response, error: true };
    }

    return response;
  },

  async find(params: Record<string, any> = {}) {
    let populate = params?.populate || {};
    populate.user_likes = true;
    params = { ...params, populate };

    const { results, pagination } = await super.find(params);

    results.forEach((res) => {
      res.likes = res.user_likes.length;
      delete res.user_likes;
    });

    return { results, pagination };
  },

  async findOne(documentId, params = {}) {
    const post = (await strapi.documents("api::post.post").findOne({
      ...params,
      status: "published",
      populate: {
        user_likes: true,
      },
      documentId,
    })) as AnyDocument;

    const likes = post.user_likes.length;
    delete post.user_likes;
    post.likes = likes;

    return Promise.resolve(post);
  },
}));
