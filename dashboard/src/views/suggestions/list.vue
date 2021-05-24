<template>
  <div class="app-container">
    <div class="filter-container">
      <el-checkbox
        v-model="onlyUnread"
        class="filter-item"
        style="margin-left: 15px"
      >
        solo no leidos
      </el-checkbox>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      row-key="_id"
      fit
      highlight-current-row
      style="width: 100%"
    >
      <!-- <el-table-column align="center" label="ID" width="210">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column> -->

      <el-table-column width="100px" align="center" label="User phone">
        <template slot-scope="scope">
          <span>{{ scope.row.user.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="200px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Texto">
        <template slot-scope="scope">
          <span>{{ scope.row.text }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="visto" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.read | statusFilter">
            {{ row.read }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            v-if="!row.read"
            size="mini"
            type="success"
            @click="putSuggestionOnReadTrue(row)"
          >Marcar como leido</el-button>
        </template>
      </el-table-column>

      <!--      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="{ row }">
          <router-link :to="'/example/edit/' + row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="120">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/' + scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              Edit
            </el-button>
          </router-link>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getSuggestions, updateSuggestion } from '@/api/suggestions'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'info'
        // deleted: "danger",
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      onlyUnread: false,
      listQuery: {
        // page: 1,
        limit: 20
      }
    }
  },
  watch: {
    onlyUnread(value) {
      this.getList({ read: value })
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(query = {}) {
      this.listLoading = true
      try {
        const response = await getSuggestions(query)
        this.list = response.docs
      } catch (error) {
        this.listLoading = false
      } finally {
        this.listLoading = false
      }
      //   fetchList(this.listQuery).then(response => {
      //     this.list = response.data.items
      //     this.total = response.data.total
      //     this.listLoading = false
      //   })
    },
    async putSuggestionOnReadTrue(row) {
      try {
        const { _id } = row

        await updateSuggestion(_id, { read: true })
        const elementIndex = this.list.findIndex(
          (element) => element._id === _id
        )

        this.list[elementIndex].read = true
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

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
