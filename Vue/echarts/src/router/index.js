import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/wordCloud',
        name: 'wordCloud',
        component: () => import('../views/WordCloud.vue')
    },
    {
        path: '/nightingale',
        name: 'nightingale',
        component: () => import('../views/Nightingale.vue')
    },
    {
        path: '/dataset',
        name: 'dateset',
        component: () => import('../views/Dataset.vue')
    },
    {
        path: '/dataZoom',
        name: 'dataZoom',
        component: () => import('../views/DataZoom.vue')
    },
    {
        path: '/example_01',
        name: 'example_01',
        component: () => import('../views/Example_01.vue')
    },
    {
        path: '/UE',
        name: 'ue',
        component: () => import('../views/TestUE.vue')
    },
    {
        path: '/lineLegend',
        name: 'lineLegend',
        component: () => import('../views/lineLegend.vue')
    },
    {
        path: '/driver',
        name: 'driver',
        component: () => import('../views/Driver.vue')
    },
    {
        path: '/element',
        name: 'element',
        component: () => import('../views/Element.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
