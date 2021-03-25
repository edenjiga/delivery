<template>
  <div class="app-container">
    <orders-table
      :orders="items"
      :is-loading="isLoading"
      @onCreateAtRangeChange="onCreateAtRangeChange"
    />
  </div>
</template>

<script>
import ORDERS_STATUS from '@/constants/ORDERS_STATUS'
import OrdersTable from './components/OrdersTable.vue'

export default {
  name: 'CanceledOrders',
  components: { OrdersTable },
  data() {
    return {
      createAtRange: null,
      isLoading: true
    }
  },
  computed: {
    items() {
      const orders = this.createAtRange
        ? this.$store.getters.getCanceledOrdersWithInterval(
          ...this.createAtRange
        )
        : this.$store.getters.getCanceledOrders

      return orders
    }
  },
  async mounted() {
    this.dispatchGetOrders()
  },
  methods: {
    onCreateAtRangeChange(createdAtRange) {
      this.createAtRange = createdAtRange
      if (createdAtRange) {
        this.$store.dispatch('orders/getOrders', {
          createdAtRange,
          status: ORDERS_STATUS.CANCELED
        })
      }
    },
    async dispatchGetOrders(query = {}) {
      this.isLoading = true
      await this.$store.dispatch('orders/getOrders', {
        status: ORDERS_STATUS.CANCELED
      })
      this.isLoading = false
    }
  }
}
</script>
