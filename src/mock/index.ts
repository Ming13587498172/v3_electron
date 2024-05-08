import { MockMethod } from "vite-plugin-mock"
import routesMock from './data/routes'  // 路由模拟数据
import loginMock from './data/login'  // 登录模拟数据
import userMock from './data/user'  // 用户模拟数据

export const mock: Array<MockMethod> = [
  ...routesMock,
  ...loginMock,
  ...userMock,
]
