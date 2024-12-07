/**
 * post service
 */

import { factories } from "@strapi/strapi";

type AnyDocument = {
  documentId: string;
  id: number;
} & {
  [key: string]: any;
};

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
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

  // Method 2: Wrapping a core service (leaves core logic in place)
  async find(...args) {
    // Calling the default core controller
    const { results, pagination } = await super.find(...args);
    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(documentId, params = {}) {
    const res = strapi.documents("api::post.post").findOne({
      ...params,
      status: "published",
      populate: {
        user_likes: true,
      },
      documentId,
    });
    return res as Promise<AnyDocument>;
  },
}));
