import { connect } from "http2";

export default {
  async beforeCreate(event) {
    //TODO: try to set author before create
    // console.log("before create event:", event);
    // const { data } = event.params;
    // const adminId = typeof data.createdBy === "number" ? data.createdBy : data.createdBy.id;
    // if (!adminId) return;
    // console.log("admin id:", event.params);
    // const author = await strapi.documents("api::author.author").findFirst({
    //   filters: {
    //     admin_id: adminId,
    //   },
    // });
    // event.params.data.authors = { set: [author.id] };
    // Object.assign(event.params.data, { author: { set: [{ id: author.id }] } });
  },
};
