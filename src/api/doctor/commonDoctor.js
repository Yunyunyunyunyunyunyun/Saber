import request from '@/router/axios';

export const getStatistics = () => {
  return request({
    url: '/api/blade-orth/treatmentrecord/statistics',
    method: 'post',
  })
}

export const getDoctorList = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/doctor-list',
    method: 'get',
    params: params,
  })
}

export const passDoctor = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/doctor-pass',
    method: 'get',
    params: params,
  })
}

export const rejectDoctor = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/doctor-fail-pass',
    method: 'get',
    params: params,
  })
}
