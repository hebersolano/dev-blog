export default {
  async beforeCreate(event) {
    const { data, where, select, populate } = event.params;
    console.log("before create", data.createdBy);
    const res = await strapi.db.query("api::author.author").findOne({
      populate: {
        admin_user: true,
      },
      where: {
        admin_user: { documentId: data.createdBy.documentId },
      },
    });

    console.log("res query", res);
  },
};
