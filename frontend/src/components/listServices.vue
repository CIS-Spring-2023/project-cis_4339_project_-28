<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API


//update as I go along with code
</script>

<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Active Services
      </h1>
      <br>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Service Name</th>
                <th class="p-4 text-left">Service Description</th>
                <!-- no need to show this if we're going to show only Active Services // uncomment if needed after discussing with teammates--> 
                <!-- <th class="p-4 text-left">Service Status</th> -->
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editService(service._id)"
                v-for="service in activeServices"
                :key="service._id"
              >
                <td class="p-2 text-left">{{ service.name }}</td>
                <td class="p-2 text-left">{{ service.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>
