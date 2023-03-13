<template>
  <div>
    <h2>Create Service</h2>
    <form @submit.prevent="submitForm">
      <label>
        Service Name:
        <input type="text" v-model="service.name" required>
      </label>
      <label>
        Description:
        <input type="text" v-model="service.description" required>
      </label>
      <label>
        Active:
        <input type="checkbox" v-model="service.active">
      </label>
      <button type="submit">{{ buttonText }}</button>
    </form>
    <p v-if="showUpdateMessage">Entry Updated!</p>
  </div>
</template>

<script>
export default {
  props: {
    selectedService: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      service: this.selectedService || { name: '', description: '', active: true },
      showUpdateMessage: false,
    };
  },
  computed: {
    buttonText() {
      return this.selectedService ? 'Update Entry' : 'Create Service';
    },
  },
  methods: {
    submitForm() {
      let createdServices = JSON.parse(localStorage.getItem('createdServices')) || [];
      if (this.selectedService) {
        createdServices[this.$route.params.index] = this.service;
        this.showUpdateMessage = true; // set the message to show
      } else {
        createdServices.push(this.service);
      }
      localStorage.setItem('createdServices', JSON.stringify(createdServices));
      this.$router.push({ name: 'createdServicesList' });
    },
  },
};
</script>

<style>
label {
  display: block;
  margin-bottom: 10px;
}
</style>
