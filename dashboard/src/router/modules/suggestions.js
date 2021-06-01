import Layout from '@/layout'

const suggestionsRouter = {
  path: '/suggestions',
  component: Layout,
  name: 'Sugerencias',
  meta: {
    title: 'Sugerencias',
    icon: 'el-icon-reading',
    roles: ['admin']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/suggestions/list'),
      name: 'SuggestionsList',
      meta: { title: 'Lista de suggerencias', icon: 'list' }
    }
  ]
}

export default suggestionsRouter
