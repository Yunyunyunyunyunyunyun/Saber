import request from '@/router/axios';

export const getCaseList = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/case-list',
    method: 'get',
    params: params,
  })
}

export const passCase = (params) => {
  return request({
    url: '/api/blade-orth/case/record-pass',
    method: 'get',
    params: params,
  })
}

export const rejectCase = (params) => {
  return request({
    url: '/api/blade-orth/case/record-fail-pass',
    method: 'get',
    params: params,
  })
}

export const selectDoctor = () => {
  return request({
    url: '/api/blade-user/selectDoctor',
    method: 'post',
  })
}

export const saveCase = (row) => {
  return request({
    url: '/api/blade-orth/case/save',
    method: 'post',
    data: row
  })
}

export const preserveCase = (row) => {
  return request({
    url: '/api/blade-orth/case/save_wait',
    method: 'post',
    data: row
  })
}

export const uploadThreeD = (params) => {
  return request({
    url: '/api/blade-orth/case/upload-3d',
    method: 'get',
    params: params,
  })
}

export const getDetails = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/doctor-detail',
    method: 'get',
    params: params,
  })
}
