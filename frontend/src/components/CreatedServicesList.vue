<template>
  <div>
    <h2>Created Services</h2>
    <table>
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Description</th>
          <th>Active</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in createdServices" :key="index">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.active ? 'Yes' : 'No' }}</td>
          <td>
            <button @click="editService(index)">Edit</button>
            <button @click="deleteService(index)">Delete</button>
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
      return JSON.parse(localStorage.getItem('createdServices')) || [];
    },
  },
  methods: {
    editService(index) {
      this.$router.push({
        name: 'createService',
        params: { index },
      });
    },
    deleteService(index) {
      let createdServices = JSON.parse(localStorage.getItem('createdServices')) || [];
      createdServices.splice(index, 1);
      localStorage.setItem('createdServices', JSON.stringify(createdServices));
      location.reload(); // reload the page to update the table
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
