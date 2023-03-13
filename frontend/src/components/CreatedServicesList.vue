<template>
  <div class="container">
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      List of Services
    </h1>
    <!-- guys its a sick table that takes the data from local storage and showcases it : OK we will just go with that option Lior (we are running out of time here-->
    <!-- When backend is implemented the data will pull from the database not locally -->
    <div class="px-10 pt-10"></div>
    <table class="min-w-full shadow-md rounded">
      <thead>
        <tr>
          <th class="p-4 text-center">Service Name</th>
          <th class="p-4 text-center">Description</th>
          <th class="p-4 text-center">Active</th>
          <th class="p-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-300">
        <tr v-for="(service, index) in createdServices" :key="index">
          <td class="p-4 text-center">{{ service.name }}</td>
          <td class="p-4 text-center">{{ service.description }}</td>
          <td class="p-4 text-center">{{ service.active ? 'Yes' : 'No' }}</td>
          <td class="p-4 text-center flex justify-center">
            <button class="bg-gray-500 text-white rounded mr-2" @click="editService(index)">Edit</button>
            <button class="bg-red-700 text-white rounded" @click="deleteService(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <!-- @wakindo 
      You did not need to recreate a list of services, create service (which I already), just Update and Delete.
      So, I am updating them since we are running out of time your vues my redirecting where needed to make it simple like we talked about
    -->
    <!-- form button "Add New Service" to open Lior's CreateService.vue -->
    <div class="flex justify-between">
      <button class="bg-red-700 text-white rounded" type="submit">
        <!-- your createService is the same as the addService I did but redirecting to your vue so I won't have to change you code a lot -->
        <router-link to="/createService">
          <span
            style="position: relative; top: 6px"
            class="material-icons"
            ></span
          >Add New Service
        </router-link>
      </button>
    </div>      
  </div>
</template>
<script>
export default {
  computed: {
    createdServices() {
      return JSON.parse(localStorage.getItem('createdServices')) || []
    }
  },
  methods: {
    editService(index) {
      this.$router.push({
        name: 'createService',
        params: { index }
      })
    },
    deleteService(index) {
      let createdServices =
        JSON.parse(localStorage.getItem('createdServices')) || []
      createdServices.splice(index, 1)
      localStorage.setItem('createdServices', JSON.stringify(createdServices))
      location.reload() // reload the page to update the table
    }
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  max-width: 800px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
