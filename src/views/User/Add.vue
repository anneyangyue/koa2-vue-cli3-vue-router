<template>
  <div id="userAdd">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input type="text" v-model="ruleForm.address" autocomplete="off"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '../../api/user'
export default {
    data() {
      var validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      };
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          callback();
        }
      };
      var validateAddress = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入地址'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          address: '',
          age: ''
        },
        rules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          address: [
            { validator: validateAddress, trigger: 'blur' }
          ],
          age: [
            { validator: validateAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let that = this
          if (valid) {
            console.log(this.ruleForm)
            userApi.add(this.ruleForm).then(function (res) {
              if(res.data.code === 0) {
                that.$message.success(res.data.message)
                that.$router.push('/user')
              } else {
                that.$message.warning(res.data.message)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
