<script>
import useVuelidate from '@vuelidate/core'
import { required, alpha } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
export default {
  props: ['id'],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      service: {
        name: '',
        description: '',
        status: ''
      }
    }
  },
  created() {
    axios.get(`${apiURL}/services/id/${this.$route.params.id}`).then((res) => {
      // simplified setting service data
      this.service = res.data
    })
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    async updateService() {
      // found issue was with the form validation with Prof. Lindner help 04/25/23 (9AM meeting)
      //do the form validation with bootstrap
      axios
        .put(`${apiURL}/services/update/${this.id}`, this.service)
        .then(() => {
          alert('Service has been updated.')
          this.$router.back()
        })
    },
    //  Service  DELETE method
    deleteService() {
      axios.delete(`${apiURL}/services/${this.id}`).then(() => {
        alert('Service has been deleted.')
        this.$router.back()
      })
    }
  }
}
</script>

<template>
  <div class="create-service">
    <!-- header thing with styling to match other parts -->
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Update Service
    </h1>
    <div class="px-10 pt-10"></div>
    <!-- form for the data name,description, status -->
    <form @submit.prevent="submitForm">
      <label class="text-2xl font-bold">
        Service Name:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="this.service.name"
          required
        />
      </label>
      <label class="text-2xl font-bold">
        Description:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="this.service.description"
        />
      </label>
      <label class="text-2xl font-bold">
        Active Status:
        <input
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          notchecked
          type="checkbox"
          v-model="service.status"
        />
      </label>
      <div class="button-group">
        <!-- update button -->
        <!-- onclick="alert('Hello Update')" --was just testing the update click event -->
        <button
          @click="updateService"
          type="submit"
          class="bg-green-700 text-white rounded"
        >
          Update Service
        </button>
        <!-- delete button -->
        <button
          @click="deleteService"
          type="submit"
          class="bg-red-700 text-white rounded"
        >
          Delete Service
        </button>
        <!---  Go Back button here so user can go back to list of services when they are done adding new one(s) instead of doing an auto reload -->
        <button
          type="reset"
          class="border border-red-700 bg-white text-red-700 rounded"
          @click="$router.back()"
        >
          Go back
        </button>
      </div>
    </form>
  </div>
</template>

<style>
label {
  display: block;
  margin-bottom: 10px;
}

.create-service {
  max-width: 500px;
  margin: 0 auto;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.submit-button {
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-button {
  background-color: #ccc;
  color: #000;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
