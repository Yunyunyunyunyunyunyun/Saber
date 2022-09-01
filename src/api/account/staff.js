import request from '@/router/axios';

export const getStaffList = (current, size, params) => {
  return request({
    url: '/api/blade-user/list-employee',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getStaffDetail = (id) => {
  return request({
    url: '/api/blade-user/detail-employee',
    method: 'post',
    params: {
      id
    }
  })
}
