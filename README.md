![CI](https://github.com/liogate/nexus-plugin-security/workflows/CI/badge.svg)

# nexus-plugin-security <!-- omit in toc -->

**Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Introduction](#introduction)
- [Installation](#installation)
- [Example Usage](#example-usage)
- [Upcoming](#upcoming)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<br>

## Introduction

This plugin **lock all queries and mutations** with a jwt authentication token required in the header using `Authoriation='Bearer <myToken>'`. You can expose any mutation or query to public with `public` attribute into field definition.

## Installation

```
npm install nexus-plugin-security
```

In your `app.ts` main file, setup the plugin using this code

```js
import { use } from 'nexus'
import { security } from 'nexus-plugin-security'

use(security({
  appSecret: 'my-super-secret',
  verifyOptions: {
    // Please refer to jsonwebtoken package
  },
  signOptions: {
    // Please refer to jsonwebtoken package
  },
  unauthorizedMessage: 'Invalid token',
  authConfig: {
    formatError: ({
      error,
      root,
      args,
      ctx,
      info
    }) => {
      return {
        name: 'Error type name',
        message: 'Custom message',
        stack: 'Error stack (optional)',
      }
    }
  }
}));
```

<br>

## Example Usage

If you need to expose a query or mutation:

```js
import { schema } from 'nexus'

schema.mutationType({
  definition(t) {
    t.field('login', {
      type: 'String',
      public: true, // <-- Expose your mutation using public set to true
      args: {
        email: 'String',
        password: 'String',
      },
      resolve(root, args) {
        const { email, password } = args;
        // Your authentication logic process
        return ctx.sign({ email }); // <-- You can sign any payload from context
      }
    })
  }
})
```

For authentication, use the `Authorization="Bearer <token_signed>"` in the header of all requests. The payload will be stored in a context attribute named `token`.

You can add extra auth ACL by using native nexus auth plugin :

Ref: https://www.nexusjs.org/#/components/schema/plugins/field-authorize

```ts
t.field('postById', {
  type: Post,
  args: { id: idArg() },
  authorize: (root, args, ctx) => ctx.auth.canViewPost(args.id),
  resolve(root, args, ctx) {
    return ctx.post.byId(args.id)
  },
})
```

## Upcoming

- Strong tests for your app safety
- Any good idea you may have through the issues :)

Thanks for support and enjoy !
