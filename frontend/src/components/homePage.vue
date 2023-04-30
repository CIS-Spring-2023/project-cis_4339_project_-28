<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from './barChart.vue'
//importing client chart
import ClientChart from './clientChart.vue'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  components: {
    AttendanceChart,
    ClientChart
  },
  data() {
    return {
      recentEvents: [],
      labels: [],
      chartData: [],
      loading: false,
      error: null,
      clientChartLabels:[], //array for client chart labels for each zipcode
      clientChartData: [], // array of client data for each zipcode counter
      clientChartLoading: false
    }
  },
  mounted() {
    this.getAttendanceData(), 
    this.getClientData()
  },
  // beforeUpdate() {
  //   this.getClientData()
  // },
  methods: {
    async getAttendanceData() {
      try {
        this.error = null
        this.loading = true
        const response = await axios.get(`${apiURL}/events/attendance`)
        this.recentEvents = response.data
        this.labels = response.data.map(
          (item) => `${item.name} (${this.formattedDate(item.date)})`
        )
        this.chartData = response.data.map((item) => item.attendees.length)
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: 'Server Response',
            message: err.message
          }
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: 'Unable to Reach Server',
            message: err.message
          }
        } else {
          // There's probably an error in your code
          this.error = {
            title: 'Application Error',
            message: err.message
          }
        }
      }
      this.loading = false
    },
    //Client chart data
    async getClientData() {
      try {
        this.error = null
        this.clientChartLoading = true
        const resp = await axios.get(`${apiURL}/clients/clientsByZip`)
        //console.log(resp.data)
        // chart labels, i.e. zipcode 77074
        this.clientChartLabels = resp.data.map((item) => `${item._id}`)
        // zipcounter i.e. 2 clients in 77074 
        this.clientChartData = resp.data.map((item) => item.Counter)
      } catch (err) {
        console.log(err.message)
         
      }
      this.clientChartLoading = false
    },
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method to allow click through table to event details
    editEvent(eventID) {
  if (this.$store.state.isAuthenticated && this.$store.state.role === 'editor') {
    this.$router.push({ name: 'eventdetails', params: { id: eventID } })
  } else {
    // Show an error message or redirect to a different page
  }
}
  }
}
</script>

<template>
  <main>
    <!-- first div after main -->
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
        Welcome, {{ $store.state.isAuthenticated ? $store.state.role.charAt(0).toUpperCase() + $store.state.role.slice(1) : '' }}!
      </h1>

      <br />
      <!--  div grid grid-cols-1- -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <!-- open and closed so ok -->
        <div class="ml-10"></div>
         <!--  div flex flex-col- -->
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(event._id)"
                v-for="event in recentEvents"
                :key="event._id"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
          </table>
          <!-- div Attendance Chart -->
          <div>
            <AttendanceChart
              v-if="!loading && !error"
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="text-6xl font-bold text-center text-gray-500 animate-pulse"
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert --> 
          </div>
          <!-- end div attendance chart -->

          <!-- Chart of Clients by Zip Code -->
          <div class="mt-40">
            <h2 class="italic font-bold text-center">
              Chart of Clients by Zip Code below:
            </h2>
          </div>
          <br />
          <!-- @wakindo: Clients Chart stuff starts here   -->
          <div>
            <ClientChart
              v-if="!loading && !error"
              :label="clientChartLabels"
              :chart-data="clientChartData"
            ></ClientChart>
          </div>
          <!--  div flex flex-col- -->
        </div>
        <!-- first div grid grid-cols-1- -->
      </div>
      <!-- for first div after main -->   
    </div>
    
  </main>
</template>
