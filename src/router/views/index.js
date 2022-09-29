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
    name: '全部',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/all')
  }, {
    path: 'pending',
    name: '待处理',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/pending')
  }, {
    path: 'treatment',
    name: '治疗中',
    meta: {
      keepAlive: true,
    },
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/treatment')
  }, {
    path: 'submission',
    name: '待提交',
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
    name: '医生病例列表',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/doctor/list')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/addEditCase',
  children: [{
    path: 'addEditCase',
    name: '新增病例',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/addEditCase')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/caseDetails',
  children: [{
    path: 'caseDetails',
    name: '病例详情',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/caseDetails')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/prescriptionDetails',
  children: [{
    path: 'prescriptionDetails',
    name: '处方表详情',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/prescriptionDetails')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/shootStandard',
  children: [{
    path: 'shootStandard',
    name: '拍摄标准',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/shootStandard')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/completeCaseDetail',
  children: [{
    path: 'completeCaseDetail',
    name: 'completeCaseDetail',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/completeCaseDetail')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/restartCaseDetail',
  children: [{
    path: 'restartCaseDetail',
    name: 'restartCaseDetail',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/case/restartCaseDetail')
  }]
}, {
  path: '/workOrderCenter',
  component: Layout,
  redirect: '/workOrderCenter/index',
  children: [{
    path: 'index',
    name: '工单中心',
    component: () =>
      import( /* webpackChunkName: "views" */ '@/views/workOrderCenter/index')
  }]
}]
