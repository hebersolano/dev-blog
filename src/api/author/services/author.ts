/**
 * author service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::author.author", ({ strapi }) => ({
  // async create(params = { data: {} }) {
  //   console.log("create service params", params);
  //   return await super.create({
  //     status: "published",
  //     ...params,
  //   });
  // },
}));
