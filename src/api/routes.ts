import request from '@/utils/request'

export const getRoutesAPI = () => {
  return request({ 
    url: '/api/routes',
    method: 'get'
  })
}
