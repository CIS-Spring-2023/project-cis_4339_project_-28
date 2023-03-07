<script>
export default {
  data() {
    return {
      items: [
        { id: 1, service: '', description: '' },
        { id: 2, service: '', description: '' },
        { id: 3, service: '', description: '' },
        { id: 4, service: '', description: '' }
      ],
      newItem: {
        id: null,
        service: '',
        description: ''
      }
    }
  },
  methods: {
    deleteItem(index) {
      this.items.splice(index, 1)
    },
    addItem() {
      this.newItem.id = this.items.length + 1
      this.items.push(this.newItem)
      this.newItem = {
        id: null,
        service: '',
        description: ''
      }
    }
  }
}
</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Service</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.id }}</td>
          <td>
            <input type="text" v-model="item.service" />
          </td>
          <td>
            <input type="text" v-model="item.description" />
          </td>
          <td>
            <button @click="deleteItem(index)">Delete</button>
          </td>
        </tr>
        <tr>
          <td><button @click="addItem">Add</button></td>
          <td><input type="text" v-model="newItem.service" /></td>
          <td><input type="text" v-model="newItem.description" /></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


