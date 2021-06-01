import request from '@/utils/request'
export function getSettings() {
  return request({
    url: '/settings',
    method: 'get'
  })
}

export function setIsStoreOpen(mobileAppStayOpen) {
  return request({
    url: '/settings/isStoreOpen',
    method: 'post',
    data: {
      mobileAppStayOpen: mobileAppStayOpen.toString()
    }
  })
}
