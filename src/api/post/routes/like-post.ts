export default {
  routes: [
    {
      // Path defined with a URL parameter
      method: "PUT",
      path: "/post/:id/like",
      handler: "post.likePost",
    },
  ],
};
