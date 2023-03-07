<template>
  <div>
    <div><h1>List of Services</h1></div>
    <table>
      <thead>
        <tr>
          <th>Service Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in servicesData" :key="service.id">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button>Edit</button>
            <button>Activate</button>
            <button>Deactivate</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Lior makes a new service-->
  <div>
    <form @submit.prevent="addItem">
      <div>
        <label>
          <span>Service Name</span>
          <span>*</span>
          <input type="text" v-model="name" required />
        </label>
      </div>


      <!-- form field -->
      <div>
        <label>
          <span>Status</span>
          <span>*</span>
          <div>
            <input
              type="radio"
              id="active"
              name="status"
              value="active"
              v-model="status"
            />
            <label for="active">Active</label>
          </div>
          <div>
            <input
              type="radio"
              id="inactive"
              name="status"
              value="inactive"
              v-model="status"
              
            />
            <label for="active">Inactive</label>
          </div>
        </label>
      </div>

      <!-- form field -->
      <div></div>
      <div></div>

      <div>
        <label>
          <span>Description</span>
          <textarea v-model="description" rows="2"></textarea>
        </label>
      </div>
      <div>
        <div></div>
        <button type="submit">Add Service</button>
        
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
// imports the needed things

const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return {
      v$: useVuelidate({ $autoDirty: true })
    }
  },
  data() {
    return {
      listOfServices: [],
      id: '',
      servicesData: [],
      name: '',
      status: '',
      description: ''
    }
  },
  created() {
    /* takes data from storage and puts into an array */
    this.servicesData = JSON.parse(localStorage.getItem('services') || '[]')
  },

  methods: {
    /* Lior added way to add items */
    addItem() {
      this.servicesData.push({
        id: this.servicesData.length,
        name: this.name,
        status: this.status,
        description: this.description
      })
      localStorage.setItem('services', JSON.stringify(this.servicesData))
      this.name = ''
      this.status = ''
      this.description = ''
    }
  },
  validations: {
    name: {
      required
    },
    status: {
      required
    }
  }
}
</script>
