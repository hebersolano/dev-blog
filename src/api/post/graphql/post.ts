export default {
  typeDef: `
          type Mutation {
              likePost(id: ID): PostEntityResponse
          }
      `,
  resolverMutation: (strapi) => {
    return async (parent, args, ctx, info) => {
      // resolver implementation
      const { id: postId } = args;
      const userId = ctx.state.user.id;
      const likedPost = await strapi.service("api::post.post").likePost({ postId, userId });
      const toEntityResponse = strapi.plugin("graphql").service("format")
        .returnType.toEntityResponse;
      const formattedResponse = toEntityResponse(likedPost, {
        args,
        resourceUID: "api::post.post",
      });

      return formattedResponse;
    };
  },

  resolverConfigMutation: {
    auth: {
      scope: ["api::post.post.likePost"],
    },
  },
};
