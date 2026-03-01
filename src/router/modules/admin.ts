export default [
    {
        path: '/admin',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'admin-dashboard',
                component: () => import('@/views/admin/AdminDashboard.vue'),
            },
            {
                path: 'users',
                name: 'admin-users',
                component: () => import('@/views/admin/AdminUsers.vue'),
            }
        ]
    }
]
