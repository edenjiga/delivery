import Layout from '@/layout'

const whatsappRouter = {
  path: '/whatsapp',
  component: Layout,
  name: 'Whatsapp',
  meta: {
    title: 'Whatsapp',
    icon: 'message',
    roles: ['admin']
  },
  children: [
    {
      name: 'Bot',
      path: 'bot',
      component: () => import('@/views/whatsapp/botQR.vue'),
      meta: { title: 'Bot' }
    }
  ]
}

export default whatsappRouter
