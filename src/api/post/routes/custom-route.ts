import { config } from "process";

export default {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/post/custom-route",
      handler: "post.exampleAction",
      config: {
        auth: false,
      }, // polices, middlewares and auth
    },
  ],
};
