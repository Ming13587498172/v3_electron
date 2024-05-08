import { MockMethod } from 'vite-plugin-mock'

let routes = [
  {
    id: 1,
    path: '/BasicOperations',
    name: 'BasicOperations',
    // component: '@/views/BasicOperations/index.vue',
    // component: '../../../views/BasicOperations/index.vue',
    component: 'BasicOperations',
    meta: { title: '基操' }
  }, {
    id: 2,
   path: '/Monitor',
    name: 'Monitor',
    component: 'Monitor',
    meta: { title: '监控' }
  }, {
    id: 3,
     path: '/Print',
    name: 'Print',
    component: 'Print',
    meta: { title: '打印' }
  }, {
    id: 4,
    path: '/Three',
    name: 'Three',
    component: 'Three',
    meta: { title: 'THREE' }
  }
]

const mock: Array<MockMethod> = [
  {
    url: '/api/routes',
    method: 'get',
    response: () => {
      return {
        status: 200,
        message: 'success',
        data: routes
      }
    }
  }
]

export default mock
