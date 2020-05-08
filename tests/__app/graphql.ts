import { mutationType, inputObjectType, objectType, queryType } from '@nexus/schema'

inputObjectType({
  name: 'LoginInput',
  description: 'Authentication gateway',
  definition(t) {
    t.field('email', {
      type: 'String',
      description: 'Email',
    })
    t.field('password', {
      type: 'String',
      description: 'Password',
    })
  }
})

mutationType({
  definition(t) {
    t.field('login', {
      type: 'String',
      public: true,
      args: {
        input: 'LoginInput',
      },
      resolve(root, args, ctx) {
        const { email, password } = args.input
        return ctx.createToken({ email });
      }
    })
  }
})