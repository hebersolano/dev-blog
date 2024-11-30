/**
 * post controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::post.post", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      ctx.body = "ok";
    } catch (err) {
      ctx.body = err;
    }
  },

  // Method 2: Wrapping a core action (leaves core logic in place)
  async find(ctx) {
    const credentials = ctx.state.auth?.credentials;
    if (credentials && credentials?.role.name === "Guest Post") {
      return await super.find(ctx);
    }

    let filters = (ctx.query?.filters || {}) as Record<string, string>;
    filters.premium = "false";
    ctx.query = { ...ctx.query, filters };
    return await super.find(ctx);
  },
}));
