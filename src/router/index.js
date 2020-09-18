import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home,
    meta: {
      guest: true
  }
  },
  {
    path: '/dashboard',
    component: () => import('../views/Root.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '',
        component: () => import('@/views/main/DashboardView'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'FAQ Page',
        path: '/faq',
        component: () => import('@/views/main/FAQ'),
        meta: {
          requiresAuth: true
        }
      },
      {
        name: 'UserList',
        path: '/users',
        component: () => import('../views/main/UsersList.vue'),
        meta: {
          requiresAuth: true
        } 
      },
      {
        name: 'Feedback',
        path: '/feedback',
        component: () => import('../views/main/FeedbackView.vue'),
        meta: {
          requiresAuth: true
        } 
      },
      {
        name: 'Random Messages',
        path: '/randomMessage',
        component: () => import('../views/main/RandomMsgView.vue'),
        meta: {
          requiresAuth: true
        } 
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(localStorage.getItem('isloggedIn'))
  // console.log(typeof !!localStorage.getItem('isloggedIn'))
  // console.log(!localStorage.getItem('isloggedIn'))

  let isloggedIn = localStorage.getItem('isloggedIn');
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (isloggedIn == 'false') {
      next({ name: 'Login'})
      
    } else {
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
      if (isloggedIn == 'true'){
          next({ name: 'Dashboard'})
      }else{
        next()
      }
  }
})

export default router
