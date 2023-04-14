

<template>
    <div>
      <h1>Logging out...</h1>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Logout',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      store.dispatch('logout');
      router.push('/login');
  
      return {};
    },
  };
  </script>
  