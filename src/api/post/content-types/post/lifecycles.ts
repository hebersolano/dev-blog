export default {
  async beforeCreate(event) {
    // set author from admin use
    const { data } = event.params;
    // beforeCreate triggered twice as it creates both the draft and published versions https://docs.strapi.io/dev-docs/migration/v4-to-v5/breaking-changes/lifecycle-hooks-document-service#table
    const adminId = typeof data.createdBy === "number" ? data.createdBy : data.createdBy.id;
    const author = await strapi.documents("api::author.author").findFirst({
      fields: ["id", "admin_id"],
      filters: {
        admin_id: adminId,
      },
    });
    event.params.data.authors =
      typeof data.createdBy === "number"
        ? { connect: [{ id: author.id }] }
        : { set: [{ id: author.id }] };
  },
};
