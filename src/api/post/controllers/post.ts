/**
 * post controller
 */

import { factories } from "@strapi/strapi";

const UID = "api::post.post";

type AnyDocument = {
  documentId: string;
  id: number;
} & {
  [key: string]: any;
};

export default factories.createCoreController("api::post.post", ({ strapi }) => ({
  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    const credentials = ctx.state.auth?.credentials;
    if (credentials && credentials?.role.name === "Guest Post") {
      return await super.find(ctx);
    }

    await this.validateQuery(ctx);
    let sanitizedQuery = await this.sanitizeQuery(ctx);

    let filters;
    filters = sanitizedQuery?.filters || {};
    filters.premium = false;

    sanitizedQuery = { ...sanitizedQuery, filters };

    const { results, pagination } = await strapi.service(UID).find(sanitizedQuery);
    const sanitizedResults = await this.sanitizeOutput(results, ctx);
    return this.transformResponse(sanitizedResults, { pagination });
  },

  async likePost(ctx) {
    const user = ctx.state.auth?.credentials;
    if (!user) {
      ctx.forbidden();
      return;
    }

    await this.validateQuery(ctx);
    const { id } = ctx.params;
    const res = await strapi.service(UID).likePost(ctx, id, user.documentId);

    if (!res) return;
    ctx.response.body = { ok: true };
  },
}));
