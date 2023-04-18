<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
      <div></div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <!--Display found services-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">Click table row to edit/display an entry</h3>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Name</th>
                <th class="p-4 text-left">Description</th>
                <th class="p-4 text-left">Status</th>
                <th class="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <!-- Comment this as I will use it once we have the service table created and backend code done -->
              <tr
                @click="editService(service._id)"
                v-for="service in serviceData"
                :key="service._id"
              >
                <td class="p-2 text-left">{{ service.name }}</td>
                <td class="p-2 text-left">{{ service.description }}</td>
                <td class="p-2 text-left">
                  {{ service.status ? 'Yes' : 'No' }}
                </td>
                <td class="p-4 text-center flex justify-center">
                  <button class="bg-gray-500 text-white rounded mr-2" @click="editService(index)">Edit</button>
                  <button class="bg-red-700 text-white rounded" @click="deleteService(index)">Delete</button>
                </td>
              </tr> 
            </tbody>

          </table>
        </div>
        </div>
    </div>
    <!-- form button "Add New Service" to open addService.vue -->
    <div class="flex justify-between">
      <button class="bg-red-700 text-white rounded" type="submit">
        <router-link to="/createService">
          <span
            style="position: relative; top: 6px"
            class="material-icons"
            ></span
          >Add New Service
        </router-link>
      </button>
    </div>      
  </main>
</template>

<script>
//import axios
import axios from "axios";
// backend endpoint API url
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      service: {
        name: "",
        description: "",
        status: "",
      },
      serviceData: [],

    };
  },
  /* once axios is mounted, automatically sends get request to pull all services */
  async mounted() {
    /* array to store response data */
    this.serviceData = [];
    await axios
      .get(`${apiURL}/services`)
      /* takes response from get request and compiles it into array */
      .then((resp) => {
        this.serviceData = resp.data;
      });
  },
  methods: {
    /* method to handle form submission*/
    async submitForm() {
      axios
        /* sends POST request through axios to backend, alerts user of success, then reloads page through router */
        .post(apiURL, this.service)
        .then(() => {
          alert("service has been successfully added.");
          /* reloads window to show changes */
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // abstract get clients call
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.serviceData = res.data
      })
    },
    /* method for deleting iso */
    deleteservice(service_id) {
      if (
        confirm(
          "Are you sure you want to permanently delete this service? This cannot be undone."
        )
      ) {
        /* axios delete request, uses api URL and attaches id at end of it to specify what id to delete */
        axios.delete(apiURL + "?id=" + service_id).then(() => {
          /* reloads window to show changes */
          window.location.reload();
        });
      }
    },
    /* method for routing to edit page */
    editservice(service_id) {
      /* Activates on click of table property, routes to update page bases on name in index.js, params are the id of the item which is stored in id:  */
      this.$router.push({ name: "updateservice", params: { id: service_id } });
    },
  },
};
</script>