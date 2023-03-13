<template>
  <div class="container">
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Created Services
    </h1>
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
            <button
              class="bg-gray-500 text-white rounded mr-2"
              @click="editService(index)"
            >
              Edit
            </button>
            <button
              class="bg-red-700 text-white rounded"
              @click="deleteService(index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
