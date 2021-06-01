import request from '@/utils/request'

export function getSuggestions(params = {}) {
  return request({
    url: '/suggestions',
    method: 'get',
    params
  })
}

export function updateSuggestion(id, data) {
  return request({
    url: `/suggestions/${id}`,
    method: 'patch',
    data
  })
}
