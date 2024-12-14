// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";
import { connect } from "http2";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["admin::user"],
      async afterCreate(event) {
        const { documentId, username, email, firstname, lastname } = event.result;

        await strapi.service("api::author.author").create({
          data: {
            username,
            email,
            firstName: firstname,
            lastName: lastname,
            admin_user: { set: [documentId] },
          },
          status: "published",
        });
      },

      async afterUpdate(event) {
        const { username, email, firstname, lastname } = event.result;

        await strapi.db.query("api::author.author").update({
          where: {
            email,
          },
          data: {
            username,
            email,
            firstName: firstname,
            lastName: lastname,
          },
        });
      },

      async afterDelete(event) {
        const { email } = event.result;
        console.log("after delete result", event.result);

        await strapi.db.query("api::author.author").delete({
          where: {
            email,
          },
        });
      },
    });
  },
};
