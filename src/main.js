//Vue dependencies
import Vue from 'vue'
import App from './App.vue'
//Bootstrap dependencies
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import router from './router.js'
import VeeValidate from 'vee-validate'
import Snotify from 'vue-snotify'
import 'vue-snotify/styles/simple.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)
Vue.use(VeeValidate);
Vue.use(Snotify)
Vue.config.productionTip = false
new Vue({
   created() {
    AOS.init();
  },
  router,
  render: h => h(App),
}).$mount('#app')
