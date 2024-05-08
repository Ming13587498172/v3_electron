import { LoginItem } from '@/types/login'
import resquest from '@/utils/request'

export const LoginAPI = (data: LoginItem) => {
  return resquest({
    url: 'api/login',
    method: 'POST',
    data
  })
}
