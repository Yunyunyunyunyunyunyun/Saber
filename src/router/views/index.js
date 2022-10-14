import Layout from '@/page/index/'

export default [{
  path: '/wel',
  component: Layout,
  redirect: '/wel/index',
  children: [{
    path: 'index',
    name: '首页',
    meta: {
      i18n: 'dashboard'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/index')
  }, {
    path: 'dashboard',
    name: '控制台',
    meta: {
      i18n: 'dashboard',
      menu: false,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/wel/dashboard')
  }]
}, {
  path: '/test',
  component: Layout,
  redirect: '/test/index',
  children: [{
    path: 'index',
    name: '测试页',
    meta: {
      i18n: 'test'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/util/test')
  }]
}, {
  path: '/info',
  component: Layout,
  redirect: '/info/index',
  children: [{
    path: 'index',
    name: '个人信息',
    meta: {
      i18n: 'info'
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/user/info')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/all',
  children: [{
    path: 'all',
    name: 'All',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/all')
  }, {
    path: 'pending',
    name: 'Pending',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/pending')
  }, {
    path: 'treatment',
    name: 'Submission',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/treatment')
  }, {
    path: 'submission',
    name: 'Treatment',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/submission')
  }]
}, {
  path: '/doctor',
  component: Layout,
  redirect: '/doctor/list',
  children: [{
    path: 'list',
    name: 'DoctorList',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/doctor/list')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/addEditCase',
  children: [{
    path: 'addEditCase',
    name: 'AddEditCase',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/addEditCase')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/caseDetails',
  children: [{
    path: 'caseDetails',
    name: 'CaseDetails',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/caseDetails')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/prescriptionDetails',
  children: [{
    path: 'prescriptionDetails',
    name: 'PrescriptionDetails',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/prescriptionDetails')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/shootStandard',
  children: [{
    path: 'shootStandard',
    name: 'ShootStandard',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/shootStandard')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/completeCaseDetail',
  children: [{
    path: 'completeCaseDetail',
    name: 'CompleteCaseDetail',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/completeCaseDetail')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/restartCaseDetail',
  children: [{
    path: 'restartCaseDetail',
    name: 'RestartCaseDetail',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/restartCaseDetail')
  }]
}, {
  path: '/workOrderCenter',
  component: Layout,
  redirect: '/workOrderCenter/index',
  children: [{
    path: 'index',
    name: 'WorkOrderCenter',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/workOrderCenter/index')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/completeForm',
  children: [{
    path: 'completeForm',
    name: 'CompleteForm',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/completeForm')
  }]
}]
