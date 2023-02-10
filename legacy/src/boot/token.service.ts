class TokenService {
  getLocalRefreshToken() {
    // @ts-expect-error localStorage stupidity
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refreshToken
  }

  getLocalAccessToken() {
    // @ts-expect-error localStorage stupidity
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.accessToken
  }

  updateLocalAccessToken(token: any) {
    // @ts-expect-error localStorage stupidity
    let user = JSON.parse(localStorage.getItem('user'))
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }
}
export default new TokenService()
