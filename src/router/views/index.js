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
    i18n: 'all'
  },
  component: () =>
    import( /* webpackChunkName: "views" */ '@/views/case/all')
  }]
}, {
  path: '/doctor',
  component: Layout,
  redirect: '/doctor/list',
  children: [{
  path: 'list',
  name: '医生病例列表',
  meta: {
    i18n: 'list'
  },
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
  meta: {
    i18n: 'addEditCase'
  },
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
  meta: {
    i18n: 'caseDetails'
  },
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
  meta: {
    i18n: 'prescriptionDetails'
  },
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
  meta: {
    i18n: 'shootStandard'
  },
  component: () =>
    import( /* webpackChunkName: "views" */ '@/views/case/shootStandard')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/completeCaseDetail',
  children: [{
  path: 'completeCaseDetail',
  name: '完成病例',
  meta: {
    i18n: 'completeCaseDetail'
  },
  component: () =>
    import( /* webpackChunkName: "views" */ '@/views/case/completeCaseDetail')
  }]
}, {
  path: '/case',
  component: Layout,
  redirect: '/case/restartCaseDetail',
  children: [{
  path: 'restartCaseDetail',
  name: '重启病例',
  meta: {
    i18n: 'restartCaseDetail'
  },
  component: () =>
    import( /* webpackChunkName: "views" */ '@/views/case/restartCaseDetail')
  }]
}]
