import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@/users/user.entity'

export const CurrentUser = createParamDecorator<
  unknown,
  ExecutionContext,
  User
>((_, ctx) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})
