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
  name: 'CompletedOrders',
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
        ? this.$store.getters.getCompletedOrdersWithInterval(
          ...this.createAtRange
        )
        : this.$store.getters.getCompletedOrders

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
        this.dispatchGetOrders({ createdAtRange })
      }
    },
    async dispatchGetOrders(query = {}) {
      try {
        this.isLoading = true
        await this.$store.dispatch('orders/getOrders', {
          ...query,
          status: ORDERS_STATUS.COMPLETED
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
