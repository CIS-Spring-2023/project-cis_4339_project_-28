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
  {
    path: '/listservices',
    name: 'listservices',
    props: true,
    component: () => import('../components/listServices.vue')
  },
  {
    path: '/updateService/:id',
    name: 'updateService',
    props: true,
    component: () => import('../components/updateService.vue')
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