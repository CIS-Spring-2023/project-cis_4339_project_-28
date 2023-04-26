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
        status: true //default value - no sense added an inactive service
      },
      serviceData: []
    }
  },
  methods: {
    async handleSubmitForm() {
      // Validate the form
      const isValid = await this.v$.$validate()

      // If the form is valid, post the new service to the API
      if (isValid) {
        // Create a new object with the correct status value
        const newService = {
          name: this.service.name,
          description: this.service.description,
          status: this.service.status
        }

        try {
          // Post the new service to the API
          await axios.post(`${apiURL}/services`, newService)
          alert('Service has been added.')
          // Go back to the list of services
          this.$router.push({ name: 'listservices' })
        } catch (error) {
          console.error(error)
        }
      }
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required },
        description: {},
        status: { required } //required as it does not make sense to add a service that will not be "Active"
      }
    }
  },
  watch: {
    'service.status': function(value) {
      if (value === false || value === 'false') {
        this.service.status = false
      } else {
        this.service.status = true
      }
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
      Create Service
    </h1>
    <div class="px-10 pt-10"></div>
    <!-- form for the data name,description, status -->
    <form @submit.prevent="handleSubmitForm">
      <label class="text-2xl font-bold">
        Service Name:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="service.name"
          required
        />
      </label>
      <label class="text-2xl font-bold">
        Description:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="service.description"
        />
      </label>
      <label class="text-2xl font-bold">
        Active Status:
        <input
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          type="checkbox"
          v-model="service.status"
        />
      </label>
      <div class="button-group">
        <button
          class="submit-button bg-red-700 text-white rounded"
          type="submit"
        >
          Save
        </button>
        <!--- @wakindo: Guys, I just added a Go Back button here so user can go back to list of services when they are done adding new one(s) instead of doing an auto reload -->
        <button
          type="reset"
          class="border border-red-700 bg-white text-red-700 rounded"
          @click="$router.back()"
        >
          Go back
        </button>
        <button class="clear-button" type="reset" @click="clearForm">
          Clear
        </button>
        <!-- a button to clear incase the person is to lazy to hit backspace -->
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
