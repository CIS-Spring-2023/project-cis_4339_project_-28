import { helperNameMap } from '@vue/compiler-core'
import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';


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
  // //david logout
  // {
  //   path: '/logout',
  //   name: 'logout',
  //   props: true,
  //   component: () => import('../components/Logout.vue')
  // }, 
  // removing old unneeded old code
  // Lior Remade how services work so now two paths are used being createdserviceslist which is the list
  // createservice allows for creating and editing services (editing is accessed through the edit button via the list) - OK sounds good
  // {
  //   path: '/CreatedServicesList',
  //   name: 'CreatedServicesList',
  //   props: true,
  //   component: () => import('../components/CreatedServicesList.vue')
  // },

  // updated part wakindo starts here
  // Leave Lior's CreatedServicesList as a backup in case anything goes wrong
  //listServices allows for viewing and editing services (editing is accessed through the edit button via the list) 
  // => using db and backend this time
  {
    path: '/listservices',
    name: 'listservices',
    props: true,
    component: () => import('../components/listServices.vue')
  },
  // updated part wakindo ends here
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
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;