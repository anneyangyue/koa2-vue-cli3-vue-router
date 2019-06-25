<template>
  <div id="user">
    <el-button type="primary" @click="addUser">新增用户</el-button>
    <el-divider></el-divider>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import userApi from '../../api/user'
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    userApi.list().then((res) => {
      console.log(res)
      this.tableData = res.data.data
    })
  },
  computed: {
  },
  methods: {
    addUser () {
      this.$router.push('/user/add')
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.$router.push(`/user/updata/${row._id}`)
    },
    handleDelete(index, row) {
      let that = this
      console.log(index, row)
      userApi.del(row._id).then((res) => {
        if(res.data.code === 0) {
          that.$message.success(res.data.message)
          userApi.list().then((res) => {
            that.tableData = res.data.data
          })
        } else {
          that.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>
