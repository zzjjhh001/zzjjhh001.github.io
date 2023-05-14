import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import uploader from 'vue-simple-uploader'
import 'vue-simple-uploader/dist/style.css'
import router from './router'

const app = createApp(App)
app.use(uploader)
app.use(router)

app.mount('#app')
