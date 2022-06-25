import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/pages/Home.vue'
import About from './components/pages/About.vue'
import Contact from './components/pages/Contact.vue'
import Single from './components/pages/Single.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '/posts/:id', name: 'postId', component: Single }
]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes
})

export default router;
