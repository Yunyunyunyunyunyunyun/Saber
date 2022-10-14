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
    url: '/api/blade-orth/case/wait',
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

export const getFailRemark = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/fail-reason',
    method: 'get',
    params: params,
  })
}

export const updateCase = (row) => {
  return request({
    url: '/api/blade-orth/case/update',
    method: 'post',
    data: row
  })
}

export const getThreeDDetail = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/detail-ddd',
    method: 'get',
    params: params,
  })
}

export const getFailHistoryReason = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/fail-history-reason',
    method: 'get',
    params: params,
  })
}

export const getPhotoDetail = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/detail-photo',
    method: 'get',
    params: params,
  })
}

export const getPrescriptionDetail = (params) => {
  return request({
    url: '/api/blade-orth/treatmentrecord/detail-record',
    method: 'get',
    params: params,
  })
}

export const completeCase = (row) => {
  return request({
    url: '/api/orth/treatmentprescriptioncomplete/complete',
    method: 'post',
    data: row,
  })
}
