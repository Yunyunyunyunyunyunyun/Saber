import request from '@/router/axios';

export const getStaffList = (params) => {
  return request({
    url: '/api/blade-user/list-employee',
    method: 'get',
    params: params
  })
}

export const getStaffDetail = (row) => {
  return request({
    url: '/api/blade-user/detail-employee',
    method: 'post',
    data: row,
  })
}
