import request from '@/router/axios';

export const getStaffList = (params) => {
  return request({
    url: '/api/blade-user/list-employee',
    method: 'get',
    params: params
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

export const modifyPassword = (row) => {
  return request({
    url: '/api/blade-user/modify-password',
    method: 'post',
    data: row,
  })
}

export const updateStaff = (row) => {
  return request({
    url: '/api/blade-user/update-employee',
    method: 'post',
    data: row,
  })
}
