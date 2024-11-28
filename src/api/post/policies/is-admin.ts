export default (policyContext, config, { strapi }) => {
  const roleNAme = policyContext.state.auth?.credentials?.role.name;
  if (config.userRole.includes(roleNAme)) return true;
  return false;
};
