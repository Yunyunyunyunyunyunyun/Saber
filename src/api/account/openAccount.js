import request from '@/router/axios';

export const getHospitalList = () => {
  return request({
    url: '/api/blade-orth/hospital-school/list-hospital',
    method: 'get',
  })
}

export const getSchoolList = () => {
  return request({
    url: '/api/blade-orth/hospital-school/list-school',
    method: 'get',
  })
}

export const selectCity = (params) => {
  return request({
    url: '/api/blade-user/select-city',
    method: 'get',
    params: {
      ...params,
    }
  })
}

export const openDoctor = (row) => {
  return request({
    url: '/api/blade-user/save-doctor',
    method: 'post',
    data: row
  })
}

export const openStaff = (row) => {
  return request({
    url: '/api/blade-user/save-employee',
    method: 'post',
    data: row
  })
}
