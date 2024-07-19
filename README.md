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

### Exception filters
Nest comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

### Pipes
A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

Pipes have two typical use cases:

- transformation: transform input data to the desired form (e.g., from string to integer)

- validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception

nest document provide 2 lib, #1 is zod user has to define schema beside dto file, #2 is class-validator use anotation to define requirement => do not need to define new file 

### Guards
A guard is a class annotated with the` @Injectable()` decorator, which implements the `CanActivate` interface.
Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as authorization. Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled by middleware in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the request object are not strongly connected with a particular route context (and its metadata).

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the next() function. On the other hand, Guards have access to the ExecutionContext instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

**HINT \
Guards are executed after all middleware, but before any interceptor or pipe.**

### Interceptors
An interceptor is a class annotated with the `@Injectable()` decorator and implements the `NestInterceptor` interface.
Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)

### Custom route decorators
Nest provides a set of useful param decorators that you can use together with the HTTP route handlers. 
ex: ```@Request(), @Req()	req```
```
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);


@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}

```

## Fundamentals
### Injection scopes 
For people coming from different programming language backgrounds, it might be unexpected to learn that in Nest, almost everything is shared across incoming requests. We have a connection pool to the database, singleton services with global state, etc. Remember that Node.js doesn't follow the request/response Multi-Threaded Stateless Model in which every request is processed by a separate thread. Hence, using singleton instances is fully safe for our applications.

A provider can have any of the following scopes:
- `DEFAULT`	A single instance of the provider is shared across the entire application. The instance lifetime is tied directly to the application lifecycle. Once the application has bootstrapped, all singleton providers have been instantiated. Singleton scope is used by default.
- `REQUEST`	A new instance of the provider is created exclusively for each incoming request. The instance is garbage-collected after the request has completed processing.
- `TRANSIENT`	Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance.

The REQUEST scope bubbles up the injection chain. A controller that depends on a request-scoped provider will, itself, be request-scoped.


### Circular dependency
A circular dependency occurs when two classes depend on each other. For example, class A needs class B, and class B also needs class A. Circular dependencies can arise in Nest between modules and between providers.

- Forward reference: \
  A forward reference allows Nest to reference classes which aren't yet defined using the forwardRef() utility function. For example, if CatsService and CommonService depend on each other, both sides of the relationship can use @Inject() and the forwardRef() utility to resolve the circular dependency. Otherwise Nest won't instantiate them because all of the essential metadata won't be available. Here's an example:
  ```
  <!-- cat.service.ts -->
  @Injectable()
  export class CatsService {
    constructor(
      @Inject(forwardRef(() => CommonService))
      private commonService: CommonService,
    ) {}
  }

  <!-- common.service.ts -->
  @Injectable()
  export class CommonService {
    constructor(
      @Inject(forwardRef(() => CatsService))
      private catsService: CatsService,
    ) {}
  } 
  ```