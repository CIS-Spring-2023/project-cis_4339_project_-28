<template>
  <div class="title">
    <div><h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">List of Services</h1></div>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th class="px-10">Service Name</th>
          <th class="px-10">Description</th>
          <th class="px-10">Status</th>
          <th class="px-10">Action</th>
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
            <button @click.prevent="activeStatus(service.id)"
            class="bg-red-700 mr-1 text-white rounded">Activate</button>
            <button @click.prevent="activeStatus(service.id)"
            class="bg-red-700 mr-1 text-white rounded">Deactivate</button>
            <button @click.prevent="deleteItem(service.id)"
            class="bg-red-700 mr-1 text-white rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
 
  <!-- Lior - makes a new service-->
  <div>
    <form @submit.prevent="addItem">
      <div class="flex flex-col">
        <label class="block">
          <span class="text-gray-700">Service Name</span>
          <span style="color: #ff0000">*</span>
          <input class="w-80 rounded-md border-gray-300" type="text" v-model="name" required />
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
          <textarea class="w-80 rounded-md border-gray-300" v-model="description" rows="1"></textarea>
        </label>
      </div>
      <div>
        <div></div>
        <button class="bg-red-700 mr-1 text-white rounded" type="submit">Add Service</button>
        <!-- need to add styling to buttons will do later -->
        <button 
          class="bg-red-700 mr-1 text-white rounded" v-on:click="sendUpdatedItem" type="button">
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
    deleteItem(serviceID) {
      if (localStorage.getItem('services') != null) {
        // Get the current list of services from localStorage
        let services = JSON.parse(localStorage.getItem('services'))
        //  service  delete
        services.splice(serviceID, 1)
        localStorage.setItem('services', JSON.stringify(services))
        // Update listOfServices 
        this.listOfServices = services
        //reload app
        location.reload()
      }
    },
    activeStatus(serviceID) {
      if (localStorage.getItem('services') == null) {
        this.listOfServices = []
      } else {
        this.listOfServices = JSON.parse(localStorage.getItem('services'))
      }
      // this.$router.push({ name: 'updateservice', params: { id: serviceID } })
      console.log(this.listOfServices)
      if (this.listOfServices[serviceID].status === 'active') {
        this.listOfServices[serviceID].status = 'inactive'
      } else {
        this.listOfServices[serviceID].status = 'active'
      }

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

<style>
.title {
  padding-bottom: 50px;
}

.row.justify-content-center {
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
}

.btn.btn-danger.mx-2 {
  background-color: #c8102e;
}

.btn.btn-danger.mx-2:hover {
  opacity: 0.5;
}

.btn.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn.btn-success:hover {
  opacity: 0.5;
}
</style>