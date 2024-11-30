/**
 * post router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::post.post", {
  config: {
    find: {
      policies: [
        // {
        //   name: "premium-user",
        //   config: {
        //     userRole: ["Guest Post"],
        //   },
        // },
      ],
    },
  },
});
