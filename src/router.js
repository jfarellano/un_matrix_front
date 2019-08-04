import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import App from './views/app.vue'
import matrixIndex from './components/matrix/index.vue'
import matrixShow from './components/matrix/show.vue'
import Show from './views/share/view.vue'
import Add from './views/share/add.vue'
Vue.use(Router)
export default new Router ({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/app',
            name: 'App',
            component: App,
            children: [
                {
                    path: 'matrix/index',
                    name: 'matrixIndex',
                    component: matrixIndex
                },
                {
                    path: 'matrix/:id',
                    name: 'matrixShow',
                    component: matrixShow
                }
            ]
        },
        {
            path: '/show/:link',
            name: 'Show',
            component: Show
        },
        {
            path: '/add/:link',
            name: 'Add',
            component: Add
        }
    ]
})
