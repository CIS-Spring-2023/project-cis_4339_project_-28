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
export default {
  data() {
    return {
      username: '',
      password: '',
      showSuccessMessage: false,
      showFailMessage: false,
      hardcodedCredentials: {
        editor: {
          username: '1',
          password: '1'
        },
        viewer: {
          username: 'viewer',
          password: 'viewerpassword'
        }
      }
    }
  },
  methods: {
    submitForm() {
      const editorCreds = this.hardcodedCredentials.editor
      const viewerCreds = this.hardcodedCredentials.viewer

      if (
        (this.username === editorCreds.username &&
          this.password === editorCreds.password) ||
        (this.username === viewerCreds.username &&
          this.password === viewerCreds.password)
      ) {
        this.showSuccessMessage = true
        this.showFailMessage = false

        // Update the Vuex store's isAuthenticated state
        this.$store.commit('setIsAuthenticated', true)

        // Navigate back to the previous page, allowing the navigation guard to handle redirection
        this.$router.go(-1)
      } else {
        this.showFailMessage = true
        this.showSuccessMessage = false
      }
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
