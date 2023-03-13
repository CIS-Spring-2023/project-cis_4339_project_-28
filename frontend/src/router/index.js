import { helperNameMap } from '@vue/compiler-core'
import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  //david login
  {
    path: '/login',
    name: 'login',
    props: true,
    component: () => import('../components/Login.vue')
  },
  {
    path: '/',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  {
    //@wakindo
    // add route for listServices Form
    path: '/listServices',
    name: 'listServices',
    props: true,
    component: () => import('../components/listServices.vue')
  },
  //@wakindo
  // add route for addService Form
  {
    path: '/addService',
    name: 'addService',
    props: true,
    component: () => import('../components/addService.vue')
  },
  //lior services route to keep things all in one place
  {
    path: '/Services',
    name: 'Services',
    props: true,
    component: () => import('../components/Services.vue')
  },
  //david logout
  {
    path: '/logout',
    name: 'logout',
    props: true,
    component: () => import('../components/Logout.vue')
  },
  {
    path: '/CreatedServicesList',
    name: 'CreatedServicesList',
    props: true,
    component: () => import('../components/CreatedServicesList.vue')
  },
  {
    path: '/createService/:index?',
    name: 'createService',
    props: (route) => ({
      selectedService: route.params.index ? JSON.parse(localStorage.getItem('createdServices'))[route.params.index] : null
    }),
    component: () => import('../components/createService.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
