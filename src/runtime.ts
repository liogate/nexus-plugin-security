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
        try {
          const token = (req.headers.authorization || '').replace('Bearer ', '')
          return {
            token: verify(token, appSecret, jwtOptions),
          }
        } catch (err) {
          return { token: undefined }
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
