<template>
    <div class="create-service">
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Login Information
      </h1>
      <div class="px-10 pt-10"></div>
      <form @submit.prevent="submitForm">
        <label class="text-2xl font-bold">
          Username:
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            v-model="service.name"
            required
          />
        </label>
        <label class="text-2xl font-bold">
          Password:
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="password"
            v-model="service.description"
            required
          />
        </label>
        <div class="button-group">
          <button
            class="submit-button bg-red-700 text-white rounded"
            type="submit"
          >
          <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  ></span> 
                  Login
              </router-link>
            </button>
            {{ buttonText }}
    
          <button class="clear-button" type="button" @click="clearForm">
            Clear
          </button>
        </div>
      </form>
      <p v-if="showSuccessMessage" class="success-message">
        Login successful!
      </p>
      <p v-else-if="showFailMessage" class="fail-message">
        Username or password incorrect
      </p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedService: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        service: this.selectedService || {
          name: '',
          description: '',
          active: true
        },
        showSuccessMessage: false
      }
    },
    computed: {
      buttonText() {
        return this.selectedService ? 'Update Entry' : ''
      }
    },
    methods: {
      submitForm() {
        let createdServices =
          JSON.parse(localStorage.getItem('createdServices')) || []
        if (this.selectedService) {
          createdServices[this.$route.params.index] = this.service
          this.showUpdateMessage = true // set the message to show
        } else {
          createdServices.push(this.service)
          this.showSuccessMessage = true // set the success message to show
          this.service = { name: '', description: '', active: true } // clear the form
        }
        localStorage.setItem('createdServices', JSON.stringify(createdServices))
        this.$router.push({ name: 'createdServicesList' })
      },
      clearForm() {
        this.service = { name: '', description: '', active: true }
        this.showSuccessMessage = false
      }
    }
  }
  </script>
  
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