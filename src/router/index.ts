import { createRouter, createWebHistory } from 'vue-router'

import authRoutes from './modules/auth'
import adminRoutes from './modules/admin'
import entrepriseRoutes from './modules/entreprise'
import formateurRoutes from './modules/formateur'
import recruteurRoutes from './modules/recruteur'
import candidatRoutes from './modules/candidat'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    ...adminRoutes,
    ...entrepriseRoutes,
    ...formateurRoutes,
    ...recruteurRoutes,
    ...candidatRoutes,
    {
      path: '/',
      redirect: '/auth',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/auth'
    }
  ],
})

export default router
