export default {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    console.log("before create", data, where, select, populate);
  },

  afterCreate(event) {
    const { result, params } = event;

    // do something to the result;
    console.log("after-create", result, params);
  },
};
