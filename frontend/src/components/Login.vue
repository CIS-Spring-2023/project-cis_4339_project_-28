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
          v-model="username"
          required
        />
      </label>
      <label class="text-2xl font-bold">
        Password:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="password"
          v-model="password"
          required
        />
      </label>
      <div class="button-group">
        <button
          class="submit-button bg-red-700 text-white rounded"
          type="submit"
        >
          Login
        </button>
        <button class="clear-button" type="button" @click="clearForm">
          Clear
        </button>
      </div>
    </form>
    <p v-if="showSuccessMessage" class="success-message">Login successful!</p>
    <p v-else-if="showFailMessage" class="fail-message">
      Username or password incorrect
    </p>
  </div>
</template>

<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      username: '',
      password: '',
      showSuccessMessage: false,
      showFailMessage: false
    }
  },
  methods: {
    submitForm() {
      // Call the login endpoint with the entered username and password
      axios
        .post(`${apiURL}/api/login`, {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          // If the credentials match show the success message
          this.showSuccessMessage = true
          this.showFailMessage = false

          // Set the role in the Vuex store to be equal to the username
          this.$store.commit('setRole', this.username)

          // Update the Vuex store isAuthenticated state to true (user is logged in)
          this.$store.commit('setIsAuthenticated', true)

          // Navigate to the dashboard
          this.$router.push('/')
        })
        .catch((err) => {
          // If the credentials don't match, show the failure message and hide the success message
          this.showFailMessage = true
          this.showSuccessMessage = false
          console.error(err)
        })
    },
    clearForm() {
      this.username = ''
      this.password = ''
      this.showSuccessMessage = false
      this.showFailMessage = false
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

.fail-message {
  color: red;
  margin-top: 10px;
}
</style>
