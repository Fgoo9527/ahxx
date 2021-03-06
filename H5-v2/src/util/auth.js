import Cookies from 'js-cookie'
import router from '../router/index.js'

const TokenKey = 'xiuxian_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function toLogin() {
  removeToken()
  router.push({ name: 'Login' })
}
