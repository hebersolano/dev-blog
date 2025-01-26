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
- Executed before or after the controller

## [Controllers](https://docs.strapi.io/dev-docs/backend-customization/controllers)

- Responsible for executing the core business logic associated to rotes.
- They are organized into actions (i.e single functions). Tied to APIs or introduced by plugins
- Available via the strapi object (`strapi.controller()`)
- Controllers use low level functions (services) that perform specific tasks

## [Services](https://docs.strapi.io/dev-docs/backend-customization/services)

- Controllers use services to perform single tasks and services on turn use underlying lower-lever functions/apis to perform data operations
- Services are helper functions that usually perform single, specific tasks and are meant to be reusable.
- Services don't perform tasks as db querying directly, instead they rely on the **Entity Service API** (Strapi v5 [**Document Service API**](https://docs.strapi.io/dev-docs/api/document-service)), which on turn relies on the **Query Engine API**
- Services belong to APIs and plugins
- They are accessible from Controllers and other Services via the `strapi.service()`

##[Lifecycle hooks](https://docs.strapi.io/dev-docs/backend-customization/models#lifecycle-hooks)

- Are functions that get triggered when Strapi queries are called, can be customized declaratively or programmatically.
  - Declarative: lifecycle hooks for content-types you created
  - Programmatic: for all other cases. In the bootstrap function
- Assignment: implement a public author field in post model (admin users are private)
  - Create a new "Author" type
  - Create a public author for every admin, keep entities in sync for updates.
  - Automatically assign Authors to post

# [GraphQL Plugin](https://docs.strapi.io/dev-docs/plugins/graphql)

# [Developing Strapi plugin](https://docs.strapi.io/dev-docs/plugins/developing-plugins)

## [Plugin creation](https://docs.strapi.io/dev-docs/plugins/development/create-a-plugin)

- Install yalc `npm install -g yalc`
- Create project `npx @strapi/sdk-plugin init my-strapi-plugin`
- Use `npm run watch:link` to add plugin project to yalc local repo
- Follow instructions showed by previous command, usually in your strapi project run `npx yalc add your-pluing-name && npx yalc link your-pluing-name && npm install` to install your plugin

## Plugin development: Github projects

1. Fetch all public repos by creating a plugin's route-controller-service chain.
2. Create the project content type
3. Extend the chain at step #1 to also return info about related projects (i.e. if already exists)
4. Creating the admin UI to list repos (with their state) and generate projects, by taking advantage of Strapi's design system
5. Automatically create, delete projects from repos (individually and in bulk)
6. Use Admin RBAC features to control access to the whole plugin and to single admin routes
7. Make the plugin multi-language

## Building

1. `npm install @octokit/request`
