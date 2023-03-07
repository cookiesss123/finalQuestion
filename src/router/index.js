import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    component: () => import('../views/DashboardLayout.vue'),
    children: [
      {
        path: 'recipes',
        component: () => import('../views/admin/AdminRecipes.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active-link',
  routes
})

export default router
