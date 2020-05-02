import { verify } from 'jsonwebtoken'
import { RuntimePlugin } from 'nexus/plugin'
import { Settings } from './settings'
import { securityPlugin } from './plugins/securityPlugin'

export const plugin: RuntimePlugin<Settings, 'required'> = (settings) => (
  project
) => {
  const { unauthorizedMessage, appSecret, jwtOptions } = settings

  const plugins = [securityPlugin({ unauthorizedMessage })]

  return {
    schema: { plugins },
    context: {
      create: (req: any) => {
        const token = (req.headers.authorization || '').replace('Bearer ', '')
        if (token.length === 0) {
          return { token: undefined }
        }
        return {
          token: verify(token, appSecret, jwtOptions),
        }
      },
      typeGen: {
        imports: [{ from: 'nexus/dist/lib/utils', as: 'utils' }],
        fields: {
          token: 'string',
        },
      },
    },
  }
}
