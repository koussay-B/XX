export default [
    {
        path: '/auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/views/auth/LoginView.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@/views/auth/RegisterView.vue'),
            }
        ]
    }
]
