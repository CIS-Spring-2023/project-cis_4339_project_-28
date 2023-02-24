import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

//***********************************
// I might add bootstrap later here
//***********************************
//Check it out with Prof. Module 6 Example first
/* import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"; */

const app = createApp(App)
app.use(router)
app.mount('#app')
