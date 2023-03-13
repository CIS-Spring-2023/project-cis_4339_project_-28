<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        List of Services
      </h1>
      <div></div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <!--Display found services-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">Click table row to edit/display an entry</h3>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Service Name</th>
                <th class="p-4 text-left">Service Description</th>
                <!-- no need to show this if we're going to show only Active Services // comment if needed after discussing with teammates--> 
                <th class="p-4 text-left">Service Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <!-- Comment this as I will use it once we have the service table created and backend code done -->
              <!-- <tr
                @click="editService(service._id)"
                v-for="service in services"
                :key="service._id"
              >
                <td class="p-2 text-left">{{ service.name }}</td>
                <td class="p-2 text-left">{{ service.description }}</td>
                <td class="p-2 text-left">{{ service.status }}</td>
              </tr> -->
              <tr>
                <td class="p-2 text-left">Service Test 1</td>
                <td class="p-2 text-left">Service test 1 description</td>
                <td class="p-2 text-left">Active</td>
              </tr>
              <tr>
                <td class="p-2 text-left">Service Test 2</td>
                <td class="p-2 text-left">Service test 2 description </td>
                <td class="p-2 text-left">Inactive</td>
              </tr>

            </tbody>
          </table>
        </div>
        </div>
    </div>
    <!-- form button "Add New Service" to open addService.vue -->
    <div class="flex justify-between mt-10 mr-20">
      <button class="bg-red-700 text-white rounded" type="submit">
        <router-link to="/addService">
          <span
            style="position: relative; top: 6px"
            class="material-icons"
            ></span
          >Add New Service
        </router-link>
      </button>
    </div>      
  </main>
</template>
