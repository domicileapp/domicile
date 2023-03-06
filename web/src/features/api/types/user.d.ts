import { BaseAPIResponse } from '@/types/BaseAPIResponse'

export interface IUser extends BaseAPIResponse {
  name: string
  username: string
  email: string
  firstName: string
  lastName: string
  lists?: []
  refreshTokens?: []
}
