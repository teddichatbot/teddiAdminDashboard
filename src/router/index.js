import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    component: () => import('../views/Root.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/main/DashboardView'),
      },
      {
        name: 'FAQ Page',
        path: '/faq',
        component: () => import('@/views/main/FAQ'),
      },
      {
        name: 'UserList',
        path: '/users',
        component: () => import('../views/main/UsersList.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
