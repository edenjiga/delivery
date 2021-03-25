<template>
  <div class="app-container">
    <el-dialog :visible.sync="deleteModalVisible" width="30%" title="Alerta">
      <span>Seguro que deseas eliminar esta orden?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteModalVisible = false">Cancel</el-button>
        <el-button type="danger" @click="cancelOrder">Confirmar</el-button>
      </span>
    </el-dialog>
    <orders-table :orders="items" :is-loading="isLoading">
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="row.status == 'CREATED'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'IN_PROGRESS')"
          >Poner en progreso</el-button>
          <el-button
            v-if="row.status == 'IN_PROGRESS'"
            size="mini"
            @click="handleModifyStatus(row, 'COMPLETED')"
          >Finalizar</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="openCancelModal(row)"
          >Cancelar</el-button>
        </template>
      </el-table-column>
    </orders-table>
  </div>
</template>

<script>
import OrdersTable from './components/OrdersTable.vue'
import { updateOrder } from '@/api/orders'
export default {
  name: 'UnfinishOrders',
  components: { OrdersTable },
  data() {
    return {
      isLoading: true,
      deleteModalVisible: false,
      orderToCancel: {}
    }
  },
  computed: {
    items() {
      return this.$store.getters.getUnfinishedOrders
    }
  },
  async mounted() {
    await this.$store.dispatch('orders/getUnfinishOrders')
    this.isLoading = false
  },
  methods: {
    async openCancelModal(order) {
      this.deleteModalVisible = true
      this.orderToCancel = order
    },
    cancelOrder() {
      this.deleteModalVisible = false
      this.handleModifyStatus(this.orderToCancel, 'CANCELED')
    },
    async handleModifyStatus(row, status) {
      const { _id } = row
      try {
        await updateOrder(_id, { status })
        this.$message({
          message: 'Success',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
