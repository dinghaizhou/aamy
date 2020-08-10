import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7e4a4bf0 = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _52f768a7 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _0e8c0aa2 = () => interopDefault(import('../pages/_slug/index.vue' /* webpackChunkName: "pages/_slug/index" */))
const _07f613af = () => interopDefault(import('../pages/_slug/comment.vue' /* webpackChunkName: "pages/_slug/comment" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/users/:id?",
    component: _7e4a4bf0,
    name: "users-id"
  }, {
    path: "/",
    component: _52f768a7,
    name: "index"
  }, {
    path: "/:slug",
    component: _0e8c0aa2,
    name: "slug"
  }, {
    path: "/:slug/comment",
    component: _07f613af,
    name: "slug-comment"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
