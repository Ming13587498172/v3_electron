import { MockMethod } from "vite-plugin-mock"

const mock: Array<MockMethod> = [
  {
    url: '/api/login',
    method: 'post',
    response: (data) => {
      let { userName, passWord } = data.body
      if (userName!== '123' && passWord!== 123456) {
        return {
          status: 500,
          message: '查询用户失败！',
          data: null
        }
      } else if ((userName!== '123' && passWord=== 123456) || (userName=== '123' && passWord!== 123456)) {
        return {
          status: 500,
          message: '用户名或密码错误！',
          data: null
        }
      } else {
        return {
          status: 200,
          message: '登录成功！',
          data: null
        }
      }
    }
  }
]

export default mock
