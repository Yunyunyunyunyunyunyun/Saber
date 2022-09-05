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
    url: '/api/blade-orth/treatmentrecord/doctor-pass',
    method: 'get',
    params: params,
  })
}

export const rejectCase = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/doctor-fail-pass',
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
