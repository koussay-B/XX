export default [
    {
        path: '/recruteur',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'recruteur-dashboard',
                component: () => import('@/views/recruteur/RecruteurView.vue'),
            },
            {
                path: 'jobs',
                name: 'recruteur-jobs',
                component: () => import('@/views/recruteur/JobOfferList.vue'),
            }
        ]
    }
]
