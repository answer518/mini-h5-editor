import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Editor from '../components/Editor.vue'
import TemplateDetail from '../components/TemplateDetail.vue'
import Index from '../views/Index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
            children: [
                { path: '', name: 'home', component: Home },
                { path: 'templte/:id', name: 'template', component: TemplateDetail }
            ]
        },
        {
            path: '/editor',
            name: 'editor',
            component: Editor,
        }
    ],
})

export default router