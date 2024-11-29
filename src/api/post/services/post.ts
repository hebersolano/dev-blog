/**
 * post service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
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

    // some custom logic
    results.forEach((result) => {
      result.counter = 1;
    });

    return { results, pagination };
  },

  // Method 3: Replacing a core service
  async findOne(documentId, params = {}) {
    return await strapi.documents("api::post.post").findOne({
      documentId: "a1b2c3d4e5f6g7h8i9j0klm",
    });
  },
}));
