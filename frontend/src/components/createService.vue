<template>
  <div class="create-service">
    <!-- header thing with styling to match other parts -->
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      {{ titleText }}
    </h1>
    <div class="px-10 pt-10"></div>
    <!-- form for the data name,description, status -->
    <form @submit.prevent="submitForm">
      <label class="text-2xl font-bold">
        Service Name:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="service.name"
          required
        />
        <!-- each part is required  -->
      </label>
      <label class="text-2xl font-bold">
        Description:
        <input
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="text"
          v-model="service.description"
          required
        />
      </label>
      <label class="text-2xl font-bold">
        Active Status:
        <input
          class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          notchecked
          type="checkbox"
          v-model="service.active"
        />
      </label>
      <div class="button-group">
        <button
          class="submit-button bg-red-700 text-white rounded"
          type="submit"
        >
          <!-- submit button! -->
          {{ buttonText }}
        </button>
        <!--- @wakindo: Guys, I just added a Go Back button here so user can go back to list of services when they are done adding new one(s) instead of doing an auto reload -->
        <button
          type="reset"
          class="border border-red-700 bg-white text-red-700 rounded"
          @click="$router.back()"
        >
          Go back
        </button>

        <button class="clear-button" type="button" @click="clearForm">
          Clear
        </button>
        <!-- a button to clear incase the person is to lazy to hit backspace -->
      </div>
    </form>
    <p v-if="showSuccessMessage" class="success-message">
      Service Successfully Added!
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
    // prop to get the data to the list vue table thingie
  },
  data() {
    return {
      service: this.selectedService || {
        name: '',
        description: '',
        active: true
      },
      showSuccessMessage: false,
      showUpdateMessage: false // added variable for update message
    }
  },
  computed: {
    buttonText() {
      return this.selectedService ? 'Update Entry' : 'Create Service'
    },
    titleText() {
      return this.selectedService ? 'Update Service' : 'Create Service'
    }
  },

  // is it an update or creation?

  // submitform does both it creates an entry and can update the entry
  // 
  methods: {
    // what to do if u submit
    submitForm() {
      // gets the already present 'createServices' data from local storage 
      // it uses "getitem" on "localstorage" to find the key "createdServices"
      // IF nothing has the key "createdServices" inside of localstorage it returns null
      // IF null is returned it then makes an empty array
      let createdServices =
        JSON.parse(localStorage.getItem('createdServices')) || []
      if (this.selectedService) {
        // checks if the selectedService prop has a value
        createdServices[this.$route.params.index] = this.service
        // shows the update message
        this.showUpdateMessage = true
        

      } else { //if selectedService doesnt have a value or returns null 
        //Lior Old code with services saved in array createdServices
        createdServices.push(this.service)//The new service object 'this.service' is added to the createdServices array, making a new service entry
        this.showSuccessMessage = true
        this.service = { name: '', description: '', active: true }
        setTimeout(() => {
          this.showSuccessMessage = false
        }, 2000) // hide success message after 2 seconds
      }
      localStorage.setItem('createdServices', JSON.stringify(createdServices)) // saves the updated 'createdServices' array to the local storage
      if (this.selectedService) {
        this.$router.push({ name: 'CreatedServicesList' })
      }
    },

///////////////////////////////////////////////////
//                    ALL THE THINGS
//
// createdServices:  array that stores all the created services
//
// this.selectedService:  prop that represents the service that is being edited or updated
//                        if this prop has a value the user is updating a service
//                        if  null the user is creating a new service
//
// this.service:  object containing the data for the service being created or updated. It has properties name, description, and active.
// 
///////////////////////////////////////////////////

    clearForm() {
      this.service = { name: '', description: '', active: true }
      this.showSuccessMessage = false
      this.showUpdateMessage = false
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
