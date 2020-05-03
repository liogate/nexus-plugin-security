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

<br>

## Example Usage

In your `app.ts` main file, setup the plugin using this code

```js
import { use } from 'nexus'
import { security } from 'nexus-plugin-security'

use(security({
  appSecret: 'my-super-secret',
  jwtOptions: {
    ignoreExpiration: true,
    // Please refer to jsonwebtoken package
  },
  unauthorizedMessage: 'Invalid token',
}));
```

If you need to expose a query or mutation:

```js
import { use } from 'nexus'
import { security } from 'nexus-plugin-security'

schema.queryType({
  definition(t) {
    t.field('publicPosts', {
      public: true,
      list: true,
      type: 'Post',
      resolve() {
        // Your code here
      }
    })
  }
})
```

## Upcoming

- Support of middlewares
- Any good idea you may have through the issues :)

Thanks for support and enjoy !
