import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UIComps from './components//UI'

const app = createApp(App)
UIComps.forEach(UIComp => app.component(UIComp.name, UIComp))

app.use(store).use(router).mount('#app')
