import { plugin } from '@nexus/schema'
import { printedGenTyping } from '@nexus/schema/dist/utils'

const fieldDefTypes = printedGenTyping({
  optional: true,
  name: 'public',
  description: 'Default value is false. If set to true, no token is required.',
  type: 'boolean',
})

interface SecurityPluginParams {
  unauthorizedMessage?: string
}

export function securityPlugin({ unauthorizedMessage }: SecurityPluginParams) {
  return plugin({
    name: 'Security Plugin',
    description: 'Nexus authentication middleware',
    fieldDefTypes,
    onCreateFieldResolver(config) {
      return async (root, args, ctx, info, next) => {
        const parentType = config.parentTypeConfig.name
        const isPublic =
          config.fieldConfig.extensions?.nexus?.config.public || false

        if (parentType !== 'Query' && parentType !== 'Mutation') {
          return await next(root, args, ctx, info)
        }

        if (!ctx.token && !isPublic) {
          throw new Error(unauthorizedMessage ?? 'Not Authorized!')
        }

        return await next(root, args, ctx, info)
      }
    },
  })
}
