<template>
  <div class=''>
     <div class='login-container'>
      <el-form class='login-form' autoComplete='on' :model='loginForm' :rules='loginRules' ref='loginForm' >
        <h3 class='title'>vue-element-admin</h3>
        <el-form-item prop='username'>
          <span class='svg-container svg-container_login'>
            <svg-icon icon-class='user' />
          </span>
          <el-input name='username' type='text' v-model='loginForm.username' autoComplete='on' placeholder='请输入用户名' />
        </el-form-item>
        <el-form-item prop='password'>
          <span class='svg-container'>
            <svg-icon icon-class='password'></svg-icon>
          </span>
          <el-input name='password' :type='pwdType' @keyup.enter.native='handleLogin' v-model='loginForm.password' autoComplete='on'
            placeholder='请输入密码'></el-input>
            <span class='show-pwd' @click='showPwd'><svg-icon icon-class='eye' /></span>
        </el-form-item>

        <el-form-item>
          <el-button type='primary' style='width:100%;' :loading='loading' @click.native.prevent='handleLogin'>
            登录
          </el-button>
        </el-form-item>
        
      </el-form>
      </div>
      <el-dialog v-el-drag-dialog  title='公司选择' width='600px' :visible.sync='dialogTableVisible'>
        公司名称
        <el-select  filterable  v-model='companyId' placeholder='请选择'>
          <el-option v-for='item in companyList' :key='item.id' :label='item.name' :value='item.id'>
          </el-option>
        </el-select>
        <div slot='footer' class='dialog-footer'>
          <el-button  @keyup.enter='handleCompanyCancel' @click='handleCompanyCancel'>取 消</el-button>
          <el-button type='primary' @keyup.enter='handleCompany' @click='handleCompany'>确 定</el-button>
        </div>
    </el-dialog>
  </div>

</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { mapState } from 'vuex'

export default {
  name: 'login',
  directives: { elDragDialog },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: false,
      companyId: '',
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('GetCompanyList', this.loginForm)
            .then(() => {
              const { companyList } = this
              this.loading = false
              this.companyId = this.companyList[0].id
              if (Array.isArray(companyList) && companyList.length >= 1) {
                this.dialogTableVisible = true
              } else {
                this.handleCompany()
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCompany() {
      this.dialogTableVisible = false
      const { companyId } = this
      this.$store
        .dispatch('Login', {
          ...this.loginForm,
          companyId })
        .then(() => {
          this.$router.push({ path: '/' })
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleCompanyCancel() {
      this.dialogTableVisible = false
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    companyList: (state) => {
      return state.user.companyList
    }
  })
}
</script>

<style rel='stylesheet/scss' lang='scss'>
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel='stylesheet/scss' lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
