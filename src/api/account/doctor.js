import request from '@/router/axios';

export const getDoctorList = (params) => {
  return request({
    url: '/api/blade-user/list-doctor',
    method: 'get',
    params: params
  })
}

export const getDoctorDetail = (id) => {
  return request({
    url: '/api/blade-user/detail-doctor',
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

export const updateDoctor = (row) => {
  return request({
    url: '/api/blade-user/update-doctor',
    method: 'post',
    data: row,
  })
}

export const getExportDoctorList = (params) => {
  return request({
    url: '/api/blade-user/export-doctor-user',
    method: 'get',
    params: params
  })
}

export const selectCityAll = (params) => {
  return request({
    url: '/api/blade-user/select-city-all',
    method: 'get',
    params: {
      ...params,
    }
  })
}

