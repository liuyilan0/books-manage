import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '概览', icon: 'dashboard' }
    }]
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页管理', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [
      {
        path: 'list',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '人员管理', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book',
    children: [
      {
        path: 'list',
        name: 'book',
        component: () => import('@/views/book/book-list'),
        meta: { title: '书籍管理', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/org',
    component: Layout,
    redirect: '/org',
    children: [
      {
        path: 'list',
        name: 'org',
        component: () => import('@/views/org/user-list'),
        meta: { title: '人员管理', icon: 'el-icon-user' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
