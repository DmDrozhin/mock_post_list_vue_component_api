import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import UIComps from '@/components//UI'
import customDirectives from '@/directives/index.js'

const app = createApp(App)
UIComps.forEach(UIComp => app.component(UIComp.name, UIComp))
customDirectives.forEach(customDir => app.directive(customDir.name, customDir))

app.use(store).use(router).mount('#app')
