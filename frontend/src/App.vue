<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  name: 'App',
  data() {
    return {
      orgName: 'Community Garden',
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    },
    role() {
      return this.$store.state.role
    }
  },
  methods: {
    logout() {
      // Dispatch the logout action from your Vuex store
      this.$store.dispatch('logout')

      // Redirect the user to the login page
      this.$router.push('/login')
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data //.name
    //removed the .name but it is still giving me the same error
      console.log(this.orgName)
    })
  }
}
</script>

<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <!-- Navigation bar section starts here -->
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!-- david login page -->
            <li v-if="!isAuthenticated">
              <router-link to="/login">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >login</span
                >
                Login
              </router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="isAuthenticated">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>

            <div v-if="role === 'editor'">
              <li>
                <router-link to="/intakeform">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >people</span
                  >
                  Client Intake Form
                </router-link>
              </li>
              <li>
                <router-link to="/eventform">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >event</span
                  >
                  Create Event
                </router-link>
              </li>
              <li>
                <!-- <router-link to="/listServices"> -->
                <router-link to="/listServices">
                  <span
                    style="position: relative; top: 6px"
                    class="material-icons"
                    >settings</span
                  >
                  Services
                </router-link>
              </li>
            </div>

            <!-- david logout page -->
            <li v-if="isAuthenticated">
              <button @click="logout">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >logout</span
                >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
