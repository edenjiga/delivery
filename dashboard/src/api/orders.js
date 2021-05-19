import request from '@/utils/request'

export function getUnfinishOrders() {
  return request({
    url: '/orders',
    method: 'get',
    params: {
      unfinished: true
    }
  })
}

export function getOrders(params = {}) {
  return request({
    url: '/orders',
    method: 'get',
    params
  })
}

export function updateOrder(id, data) {
  return request({
    url: `/orders/${id}`,
    method: 'patch',
    data
  })
}
