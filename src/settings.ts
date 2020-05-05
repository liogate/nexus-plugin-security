import { VerifyOptions, SignOptions } from 'jsonwebtoken'

export type Settings = {
  unauthorizedMessage?: string
  appSecret: string
  verifyOptions: VerifyOptions
  signOptions: SignOptions
}
