export default [
    {
        path: '/entreprise',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'entreprise-list',
                component: () => import('@/views/entreprise/EntrepriseView.vue'),
            },
            {
                path: 'stats',
                name: 'entreprise-stats',
                component: () => import('@/views/entreprise/EntrepriseStats.vue'),
            }
        ]
    }
]
