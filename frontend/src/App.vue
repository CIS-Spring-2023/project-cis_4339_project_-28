<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  data() {
    return {
      orgName: 'Dataplatform'
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name
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
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
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
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li>
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li>
              <router-link to="/testServices">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Services TEST
              </router-link>
            </li>
            <li>
              <router-link to="/services">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >settings</span
                >
                Services
              </router-link>
            </li>
            <!--@wakindo -->
            <!-- menu item to add a service but I will change it later to listService
             so we can list services / double click to update / click on btnAddNewService 
             to get to the AddService Form -->
            <li>
              <router-link to="/addService">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Add Service
              </router-link>
            </li>
            <!--@wakindo -->
            <!-- Try Listing of Service menu item here
            might need to implement search by service name later --> 
            <li>
              <router-link to="/listServices">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Services
              </router-link>
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
