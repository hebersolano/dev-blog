/**
 * post router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::post.post", {
  config: {
    find: {
      policies: [
        {
          name: "is-admin",
          config: {
            userRole: ["Guest Post", "Administrator"], // will pass as config values
          },
        },
      ],
    },
  },
});
