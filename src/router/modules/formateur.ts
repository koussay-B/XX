import QuestionView from '@/views/formateur/question.vue'
import RapportView from '@/views/formateur/rapportView.vue'

export default [
    {
        path: '/formateur',
        component: () => import('@/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'formateur-dashboard',
                component: () => import('@/views/formateur/FormateurView.vue'),
            },
            {
                path: 'gestionView',
                name: 'formateur-gestion',
                component: () => import('@/views/formateur/gestionView.vue'),
            },
            {
                path: 'candidatsView',
                name: 'formateur-candidats',
                component: () => import('@/views/formateur/candidatsView.vue'),
            },
            {
                path: 'questionnaire',
                name: 'formateur-questionnaire',
                component: () => import('@/views/formateur/questionnaire.vue'),
            },
            {
                path: 'question',
                name: 'formateur-question',
                component: QuestionView,
            },
           {
                path: 'rapportView/:id',
                name: 'formateur-rapport',
                component: RapportView,
            }

        ]
    }
]