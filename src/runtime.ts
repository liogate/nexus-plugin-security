import { verify, sign } from 'jsonwebtoken'
import { RuntimePlugin } from 'nexus/plugin'
import { Settings } from './settings'
import { securityPlugin } from './plugins/securityPlugin'

export const plugin: RuntimePlugin<Settings, 'required'> = (settings) => (
  project
) => {
  const { unauthorizedMessage, appSecret, verifyOptions, signOptions } = settings
  const createToken = (payload: string | object | Buffer) => sign(payload, appSecret, signOptions);

  const plugins = [securityPlugin({ unauthorizedMessage })]

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
            createToken
          }
        }
      },
      typeGen: {
        imports: [{ from: 'nexus/dist/lib/utils', as: 'utils' }],
        fields: {
          token: 'string',
          createToken: '(payload: string | object | Buffer) => string',
        },
      },
    },
  }
}
