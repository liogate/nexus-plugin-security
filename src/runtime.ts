import { verify, sign } from 'jsonwebtoken'
import { fieldAuthorizePlugin } from '@nexus/schema'
import { RuntimePlugin } from 'nexus/plugin'
import { Settings } from './settings'
import { securityPlugin } from './plugins/securityPlugin'

export const plugin: RuntimePlugin<Settings, 'required'> = (settings) => (
  project
) => {
  const {
    unauthorizedMessage,
    appSecret,
    verifyOptions,
    signOptions,
    authConfig,
  } = settings
  const createToken = (payload: string | object | Buffer) =>
    sign(payload, appSecret, signOptions)

  const plugins = [
    securityPlugin({ unauthorizedMessage }),
    fieldAuthorizePlugin(authConfig),
  ]

  project.log.debug('nexus-plugin-security is running')

  return {
    schema: { plugins },
    context: {
      create: (req: any) => {
        try {
          const token = (req.headers.authorization || '').replace('Bearer ', '')
          return {
            token: verify(token, appSecret, verifyOptions),
            createToken,
          }
        } catch (err) {
          return {
            token: undefined,
            createToken,
          }
        }
      },
      typeGen: {
        imports: [{ from: 'nexus/dist/lib/utils', as: 'utils' }],
        fields: {
          token: 'object | string | undefined',
          createToken: '(payload: string | object | Buffer) => string',
        },
      },
    },
  }
}
