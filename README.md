# Nest
## Overview
### Controllers
Controllers are responsible for handling incoming requests and returning responses to the client.

For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: ``` nest g resource [name].```
### Providers
Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. It can be injected as a dependency; 
To create a service using the CLI, simply execute the  ```nest g service cats``` command.

### Modules 
A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

The @Module() decorator takes a single object whose properties describe the module:

`providers`	the providers that will be instantiated by the Nest injector and that may be shared at least across this module.

`controllers`	the set of controllers defined in this module which have to be instantiated.

`imports`	the list of imported modules that export the providers which are required in this module.

`exports`	the subset of providers that are provided by this module and should be available in other modules which import this module. You can use either the provider itself or just its token (provide value)

To create a module using the CLI, simply execute the `nest g module cats` command.

In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.


### Middleware
Nest middleware are, by default, equivalent to express middleware.
You implement custom Nest middleware in either a function, or in a class with an `@Injectable()` decorator.

Nest middleware fully supports Dependency Injection. Just as with providers and controllers, they are able to inject dependencies that are available within the same module. As usual, this is done through the constructor.

