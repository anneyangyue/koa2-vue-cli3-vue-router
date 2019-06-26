<template>
  <div id="register">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item>
        <div class="titleItem centerItem">登录</div>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="checkCode">
        <el-input type="text" v-model="ruleForm.checkCode" autocomplete="off" class="codeinput"></el-input>
        <span v-html="codeImg" @click="changeCode"></span>
      </el-form-item>
      <el-form-item class="centerItem">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary"><router-link to='/register' class="linkitem">注册</router-link></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import loginApi from '../../api/login'
import {saveAdminInfo} from '../../util/jwt'
export default {
  created() {
    loginApi.checkCode().then((res) => {
      console.log('checkCode', res)
      this.codeImg = res.data
    })
  },
  data() {
      var checkUsermame = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        }else {
          callback()
        }
      }
      return {
        ruleForm: {
          username: '',
          pass: '',
          checkCode: ''
        },
        rules: {
          username: [
            { validator: checkUsermame, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkCode: [
            { validator: validCode, trigger: 'blur' }
          ]
        },
        codeImg: ''
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          if (valid) {
            loginApi.login({
              username: that.ruleForm.username,
              password: that.ruleForm.pass,
              checkCode: that.ruleForm.checkCode
            }).then(function (res) {
              console.log('res',res,res.data)            
              if (res.data.code === 0) { 
                that.$message.success(res.data.message)
                saveAdminInfo(res.data.data)
                that.$router.push('/')
              } else {
                that.$message.warning(res.data.message)
              }
            })
          } else {
            this.$message.warning('登录失败')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      changeCode() {
        loginApi.checkCode().then((res) => {
          console.log('checkCode', res)
          this.codeImg = res.data
        })
      }
    }
}
</script>
<style scoped>
#register{
  width: 500px;
  margin: auto;
  margin-top: 300px;
  border: 1px solid #ddd;
  padding: 50px 50px 20px 20px;
}
.titleItem{
  font-size: 20px;
  font-weight: bolder;
  color: #333;
}
.centerItem{
  text-align: center;
}
.linkitem{
  color: #fff;
  text-decoration: none;
}
.codeinput{
  width: 150px;
}
</style>

