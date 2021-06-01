import ORDERS_STATUS from '@/constants/ORDERS_STATUS'
import { addDays, isWithinInterval } from 'date-fns'

const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  getUnfinishedOrders: state =>
    Object.values(state.orders.items).filter(
      item =>
        item.status !== ORDERS_STATUS.COMPLETED &&
        item.status !== ORDERS_STATUS.CANCELED
    ),

  getCanceledOrders: state =>
    Object.values(state.orders.items).filter(
      item => item.status === ORDERS_STATUS.CANCELED
    ),
  getCanceledOrdersWithInterval: (state, getters) => (startDate, endDate) => {
    return getters.getCanceledOrders.filter(item => {
      return isWithinInterval(new Date(item.createdAt), {
        start: new Date(startDate),
        end: addDays(new Date(endDate), 1)
      })
    })
  },
  getCompletedOrders: state =>
    Object.values(state.orders.items).filter(
      item => item.status === ORDERS_STATUS.COMPLETED
    ),
  getCompletedOrdersWithInterval: (state, getters) => (startDate, endDate) => {
    return getters.getCompletedOrders.filter(item => {
      return isWithinInterval(new Date(item.createdAt), {
        start: new Date(startDate),
        end: addDays(new Date(endDate), 1)
      })
    })
  }
}
export default getters
