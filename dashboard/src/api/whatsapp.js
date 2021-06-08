import request from '@/utils/request'

export function getQr() {
  return request({
    url: '/whatsapp/qr',
    method: 'get'
  })
}

export function getWhatsappBotStatus() {
  return request({
    url: '/whatsapp/status',
    method: 'get'
  })
}
