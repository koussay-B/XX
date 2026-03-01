export default [
    {
        path: '/candidat',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'candidat-dashboard',
                component: () => import('@/views/candidat/CandidatView.vue'),
            },
            {
                path: 'profile',
                name: 'candidat-profile',
                component: () => import('@/views/candidat/ProfileView.vue'),
            }
        ]
    }
]
