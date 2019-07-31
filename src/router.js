import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
Vue.use(Router)
export default new Router ({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
    ]
})
