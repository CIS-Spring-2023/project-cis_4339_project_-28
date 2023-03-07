<template>
  <div>
    <div><h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">List of Services</h1></div>
    <table>
      <thead>
        <tr>
          <th class="px-10 py-20">Service Name</th>
          <th class="px-10 py-20">Description</th>
          <th class="px-10 py-20">Status</th>
          <th class="px-10 py-20">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in servicesData" :key="service.id">
          <td>{{ service.name }}</td>
          <td>{{ service.description }}</td>
          <td>{{ service.status }}</td>
          <td>
            <button @click.prevent="updateItem(service.id)"
            class="bg-red-700 mr-1 text-white rounded">Edit</button>
            <button class="bg-red-700 mr-1 text-white rounded">Activate</button>
            <button class="bg-red-700 mr-1 text-white rounded">Deactivate</button>
            <button class="bg-red-700 mr-1 text-white rounded">Delete</button>
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
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
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
              class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
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
          <textarea v-model="description" rows="1"></textarea>
        </label>
      </div>
      <div>
        <div></div>
        <button class="btn btn-success" type="submit">Add Service</button>
        <!-- need to add styling to buttons will do later -->
        <button 
          class="btn btn-success" v-on:click="sendUpdatedItem" type="button">
          Update
        </button>
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
    },
    updateItem(serviceID) {
      if (localStorage.getItem('services') == null) {
        this.listOfServices = []
      } else {
        this.listOfServices = JSON.parse(localStorage.getItem('services'))
      }
      
      this.name = this.listOfServices[serviceID].name
      this.status = this.listOfServices[serviceID].status
      this.description = this.listOfServices[serviceID].description
      this.id = this.listOfServices[serviceID].id
      console.log(this.id)
    },
    sendUpdatedItem() {
      this.listOfServices.id = this.id
      this.listOfServices[this.id].name = this.name
      this.listOfServices[this.id].status = this.status
      this.listOfServices[this.id].description = this.description

      console.log(this.listOfServices)

      localStorage.setItem('services', JSON.stringify(this.listOfServices))
      location.reload()
    },
  },
  sendUpdatedItem() {
      this.listOfServices.id = this.id
      this.listOfServices[this.id].name = this.name
      this.listOfServices[this.id].status = this.status
      this.listOfServices[this.id].description = this.description

      console.log(this.listOfServices)

      localStorage.setItem('services', JSON.stringify(this.listOfServices))
      location.reload()
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
