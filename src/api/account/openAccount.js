import request from '@/router/axios';

export const selectCity = (params) => {
  return request({
    url: '/api/blade-user/select-city',
    method: 'get',
    params: {
      ...params,
    }
  })
}