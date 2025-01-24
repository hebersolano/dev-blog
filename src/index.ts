// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";
import { createUsernameFromEmail } from "../utils/general";

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

      async beforeCreate(event) {
        const { username, email } = event.params.data;
        let newUsername = username ? username : createUsernameFromEmail(email);
        event.params.data.username = newUsername;
      },

      async afterCreate(event) {
        // check if all admins have a author profile
        const admins = await strapi.db.query("admin::user").findMany();
        for (const admin of admins) {
          const count = await strapi.db.query("api::author.author").count({
            filters: {
              admin_id: admin.id,
            },
          });
          if (count > 0) continue;
          const { documentId, username, email, firstname, lastname } = admin;
          await strapi.service("api::author.author").create({
            data: {
              username,
              email,
              firstName: firstname,
              lastName: lastname,
              admin_user: { set: [documentId] },
              admin_id: admin.id,
            },
            status: "published",
          });
        }
      },

      async afterUpdate(event) {
        const { id, username, email, firstname, lastname } = event.result;
        await strapi.db.query("api::author.author").update({
          where: {
            admin_id: id,
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
        const { id } = event.result;
        await strapi.db.query("api::author.author").delete({
          where: {
            admin_id: id,
          },
        });
      },
    });
  },
};
