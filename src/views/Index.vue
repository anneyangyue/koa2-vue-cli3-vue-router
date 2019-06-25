<template>
  <div id="home">
    <el-row class="tac">
    <el-col :span="6">
      <h5>用户管理系统</h5>
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">
            <router-link to="/home">Home</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">
            <router-link to="/about">About</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">
            <router-link to="/user">User</router-link>            
          </span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <el-row class="headerInfo">
        <el-col :span="16">
          <div class="titleInfo">title</div>
          </el-col>
        <el-col :span="4">
          <div class="userInfo">user</div>
        </el-col>
        <el-col :span="4">
            <div class="logout" @click="logout">退出</div>
          </el-col>
      </el-row>
      <router-view></router-view>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import {adminLogout} from '../util/jwt'
export default {
  name: 'home',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    logout () {
      adminLogout()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
.headerInfo{
  height: 50px;
  line-height: 50px;
}
.titleInfo{
  font-size: 20px;
}
.userInfo{
  text-align: center;
  padding-right: 20px;
}
.logout{
  text-align: right;
  padding-right: 20px;
}
</style>

