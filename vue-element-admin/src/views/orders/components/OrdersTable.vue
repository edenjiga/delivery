<template>
  <div>
    <el-input
      v-model="listQuery.phoneNumber"
      placeholder="Number"
      style="width: 200px"
      class="filter-item"
    />
    <el-date-picker
      v-model="createAtRange"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="To"
      start-placeholder="Fecha inicial"
      end-placeholder="Fecha Final"
      value-format="yyyy/MM/dd"
      :picker-options="pickerOptions"
    />
    <el-table
      ref="orderTable"
      v-loading="isLoading"
      :data="items"
      row-key="_id"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @expand-change="expandChange"
    >
      <el-table-column type="expand">
        <template slot-scope="{ row }">
          <expandable-table-content :order="row" />
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="Telefono / Nombre">
        <template slot-scope="{ row }">
          <span>{{ row.user.phone }}</span>
          <span>{{ row.user.name }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="Direccion">
        <template slot-scope="{ row }">
          <span>{{ row.address.nomenclature }}</span>
          <span>{{ row.address.note }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="Fecha de creacion"
        prop="createdAt"
        sortable
      >
        <template slot-scope="{ row }">
          <span>{{
            new Date(row.createdAt) | parseTime("{y}-{m}-{d} {h}:{i}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="130px" align="center" label="metodo de pago">
        <template slot-scope="{ row }">
          <span>{{ row.payment.paymentMethod | paymentMethodFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column width="130px" align="center" label="valor">
        <template slot-scope="{ row }">
          <span>{{ row.price | formatNumberToCop }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" class-name="status-col" width="150">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | orderStatusFilter">
            {{ row.status | orderStatusDictionary }}
          </el-tag>
          <!-- <el-tag
          v-if="row.payment.paymentMethod === 'CREDIT_CARD'"
          :type="row.payment.status | paymentStatus"
          >{{ row.payment.status | paymentStatusDictionary }}</el-tag
        > -->
        </template>
      </el-table-column>
      <el-table-column label="Pago status" class-name="status-col" width="150">
        <template slot-scope="{ row }">
          <el-tag>
            {{ row.payment.status | paymentStatusDictionary }}
          </el-tag>
        </template>
      </el-table-column>
      <slot />
    </el-table>
  </div>
</template>
<script>
import ORDERS_STATUS from '@/constants/ORDERS_STATUS'
import PAYMENT_STATUS from '@/constants/PAYMENT_STATUS'
import { formatNumberToCop } from '@/utils'
import ExpandableTableContent from './components/ExpandableTableContent.vue'

export default {
  components: {
    ExpandableTableContent
  },
  filters: {
    formatNumberToCop,
    paymentStatus(status) {
      const statusMap = {
        [PAYMENT_STATUS.NOT_PAID]: 'info',
        [PAYMENT_STATUS.PENDING]: 'info',
        [PAYMENT_STATUS.APPROVED]: 'success',
        [PAYMENT_STATUS.DECLINED]: 'danger',
        [PAYMENT_STATUS.ERROR]: 'danger'
      }
      return statusMap[status]
    },
    paymentStatusDictionary(status) {
      const statusMap = {
        [PAYMENT_STATUS.NOT_PAID]: 'No Cobrado',
        [PAYMENT_STATUS.PENDING]: 'En progreso',
        [PAYMENT_STATUS.APPROVED]: 'Aprobado',
        [PAYMENT_STATUS.DECLINED]: 'Rechazado',
        [PAYMENT_STATUS.ERROR]: 'ERROR'
      }
      return statusMap[status]
    },
    paymentMethodFilter(paymentMethod) {
      switch (paymentMethod) {
        case 'CREDIT_CARD':
          return 'Tarjeta de credito'
        case 'DATAPHONE':
          return 'Datafono'
        default:
          return 'Efectivo'
      }
    },
    orderStatusFilter(status) {
      const statusMap = {
        [ORDERS_STATUS.CREATED]: 'info',
        [ORDERS_STATUS.COMPLETED]: 'success',
        [ORDERS_STATUS.IN_PROGRESS]: '',
        [ORDERS_STATUS.CANCELED]: 'danger'
      }
      return statusMap[status]
    },
    orderStatusDictionary(status) {
      const statusMap = {
        [ORDERS_STATUS.CREATED]: 'Creada',
        [ORDERS_STATUS.COMPLETED]: 'Completada',
        [ORDERS_STATUS.IN_PROGRESS]: 'En progreso',
        [ORDERS_STATUS.CANCELED]: 'Cancelada'
      }
      return statusMap[status]
    }
  },
  props: {
    isLoading: Boolean,
    orders: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      orderSelectecId: '',
      listQuery: {
        phoneNumber: ''
      },
      createAtRange: null,
      pickerOptions: {
        shortcuts: [
          {
            text: 'Hoy',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Ultima semana',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Ultimo mes',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {
    items() {
      const { phoneNumber } = this.listQuery
      if (phoneNumber) {
        return this.orders.filter(({ user }) =>
          user.phone.includes(phoneNumber)
        )
      }
      return this.orders
    }
  },
  watch: {
    createAtRange() {
      this.$emit('onCreateAtRangeChange', this.createAtRange)
    }
  },
  methods: {
    expandChange(row, expanded = []) {
      this.orderSelectecId = row._id

      // hide the previous selected row
      if (expanded.length >= 2) {
        this.$refs.orderTable.toggleRowExpansion(expanded[0], false)
      }
    }
  }
}
</script>
