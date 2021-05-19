-<template>
  <div>
    <!-- <a
      v-if="order.coordinates"
      :href="`https://www.google.com/maps/@${order.coordinates.latitude},${order.coordinates.longitude}`"
      target="_blank"
      >Ir a la direccion</a
    > -->
    <el-table
      :data="order.productsWithUnit"
      border
      show-summary
      style="width: 100%"
      :summary-method="getSummaries"
    >
      <el-table-column prop="product.name" label="Nombre" width="150" />
      <el-table-column prop="product.price" label="Precio" width="125" />
      <el-table-column
        prop="product.discountValue"
        label="Descuento"
        width="125"
      />
      <el-table-column
        prop="product.finalPrice"
        label="Precio final"
        width="125"
      />
      <el-table-column prop="unitsPurchased" label="Cantidad" width="100" />
      <el-table-column label="Total" width="200">
        <template slot-scope="{ row }">
          <span>{{ row.product.finalPrice * row.unitsPurchased }}</span>
        </template>
      </el-table-column>
    </el-table>
    <h3>Valor del domicilio: $ {{ order.deliveryValue }}</h3>
    <h3>Total con Domicilio: $ {{ order.price }}</h3>
  </div>
</template>

<script>
import { formatNumberToCop } from '@/utils'
export default {
  props: {
    loading: Boolean,
    order: {
      type: Object,
      default() {
        return {
          coordinates: {},
          products: [],
          payment: {}
        }
      }
    }
  },
  methods: {
    getSummaries(param) {
      const sums = ['']
      const { columns, data } = param
      let values
      columns.forEach((column, index) => {
        switch (index) {
          case 0:
            sums[index] = 'Total'
            return
          case 1:
            values = data.map((item) => Number(item.product.price))
            break
          case 2:
            values = data.map((item) => Number(item.product.discountValue))
            break

          case 3:
            values = data.map((item) => Number(item.product.finalPrice))
            break

          case 5:
            values = data.map(
              (item) =>
                Number(item.product.finalPrice) * Number(item.unitsPurchased)
            )

            break
          default:
            sums[index] = data.reduce(
              (prev, item) => prev + Number(item[column.property]),
              0
            )
            return
        }

        if (!values.every((value) => isNaN(value))) {
          sums[index] =
            '$ ' +
            formatNumberToCop(
              values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            )
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }
  }
}
</script>
