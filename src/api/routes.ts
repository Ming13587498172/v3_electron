import request from '@/utils/request'

export const getRoutesAPI = () => {
  return request({ 
    url: '/api/routes',
    method: 'get'
  })
}

export const getDynamicRoutesAPI = () => {
  return request({
    url: '/api/dynamicRoutes',
    method: 'get'
  })
}
