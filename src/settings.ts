import { VerifyOptions, SignOptions } from 'jsonwebtoken'
import { FieldAuthorizePluginConfig }  from '@nexus/schema/dist/plugins/fieldAuthorizePlugin'

export type Settings = {
  appSecret: string
  verifyOptions?: VerifyOptions
  signOptions?: SignOptions
  unauthorizedMessage?: string
  authConfig?: FieldAuthorizePluginConfig
}
