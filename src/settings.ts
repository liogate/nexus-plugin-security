import { VerifyOptions } from 'jsonwebtoken'

export type Settings = {
  unauthorizedMessage?: string
  appSecret: string
  jwtOptions: VerifyOptions
}
