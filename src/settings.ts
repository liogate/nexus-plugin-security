import { VerifyOptions, SignOptions } from 'jsonwebtoken'

export type Settings = {
  appSecret: string
  verifyOptions?: VerifyOptions
  signOptions?: SignOptions
  unauthorizedMessage?: string
}
