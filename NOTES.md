https://github.com/coderjib/strapi-devblog

# Content Types

- **Collection** types are content-types that can manage several entries.
- **Single types** are content-types that can only manage one entry.
- **Components** are a data structure that can be used in multiple collection types and single types.

# GraphQl

- [Strapi GraphQl docs](https://docs.strapi.io/dev-docs/api/graphql)
- [Strapi GraphQL plugin docs](https://docs.strapi.io/dev-docs/plugins/graphql#registration)

# Strapi Architecture

- Request
- Polices
- Route
- Middleware
- Controller
  - Webhooks
  - Service
- Response

- Models

## Models

- Content-Types: create and group content-types under an api
- [life cycle hooks](https://docs.strapi.io/dev-docs/backend-customization/models#lifecycle-hooks): functions that get triggered when Strapi queries are called

## [Routes](https://docs.strapi.io/dev-docs/backend-customization/routes)

- Endpoints
- Each route can has polices, middlewares and controllers. (middleware run before request reach route)
- There are two types of routes:

  - [Core routes](https://docs.strapi.io/dev-docs/backend-customization/routes#configuring-core-routers): Core routers (i.e. find, findOne, create, update, and delete) correspond to default routes
  - [Custom routes](https://docs.strapi.io/dev-docs/backend-customization/routes#creating-custom-routers)

## [Polices](https://docs.strapi.io/dev-docs/backend-customization/policies)

- functions associated to routes, which are executed before a request reaches a route. Use case: check if request can pass
- Policies type or scope:
  - global polices: belong to the strapi core and can be associated to any route
  - plugin polices: created by plugins but can be used globally like global polices
  - api polices: specific of a content type

## Strapi object

Is injected is strapi's core functions (policies, controllers and services) to give them access to other strapi functionalities.

## [Middlewares](https://docs.strapi.io/dev-docs/backend-customization/routes#middlewares)

- Are functions after a request reach certain route and somehow alter the request/response
- Middlewares does not deal with core business logic
- Executed before the controller or after
