import Layout from '@/layout'

const ordersRouter = {
  path: '/orders',
  component: Layout,
  name: 'Ordenes',
  meta: {
    title: 'Ordenes',
    icon: 'orders',
    roles: ['admin']
  },
  children: [
    {
      name: 'unfinish-orders',
      path: 'unfinish',
      component: () => import('@/views/orders/unfinish-orders'),
      meta: { title: 'Ordenes no finalizadas' }
    },
    {
      name: 'canceled-orders',
      path: 'canceled',
      component: () => import('@/views/orders/canceled-orders'),
      meta: { title: 'Ordenes Canceladas' }
    },
    {
      name: 'completed-orders',
      path: 'completed',
      component: () => import('@/views/orders/completed-orders'),
      meta: { title: 'Ordenes Completadas' }
    }
  ]
}

export default ordersRouter
