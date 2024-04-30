import { MockMethod } from "vite-plugin-mock"
import userMock from './data/user'

export const mock: Array<MockMethod> = [
  ...userMock,
]
