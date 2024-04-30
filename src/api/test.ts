import request from "@/utils/request"

export const TestApi = () => {
  return request({ 
    url: '/api/test',
    method: 'get'
  })
}
