<template>
  <el-form
    ref="updatePasswordForm"
    :model="updatePasswordForm"
    :rules="updatePasswordRules"
    label-position="left"
  >
    <el-form-item prop="oldPassword">
      <el-input
        v-model="updatePasswordForm.oldPassword"
        placeholder="contraseña"
        name="oldPassword"
        tabindex="2"
      />
    </el-form-item>
    <el-form-item prop="newPassword">
      <el-input
        v-model="updatePasswordForm.newPassword"
        placeholder="nueva contraseña"
        name="newPassword"
        tabindex="2"
      />
    </el-form-item>
    <el-form-item prop="newPassword2">
      <el-input
        v-model="updatePasswordForm.newPassword2"
        placeholder="confirma nueva contraseña"
        name="newPassword2"
        tabindex="2"
      />
    </el-form-item>
    <!-- <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>-->
    <el-form-item>
      <el-button :loading="loading" type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updatePassword } from '@/api/user'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  data() {
    const validateMinLength = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    const validateEqualPassword = (rule, value, callback) => {
      if (this.updatePasswordForm.newPassword !== value) {
        callback(new Error('the password dont match'))
      }
      callback()
    }

    return {
      loading: false,
      updatePasswordForm: {
        oldPassword: '',
        newPassword: '',
        newPassword2: ''
      },
      updatePasswordRules: {
        oldPassword: [
          { required: true, trigger: 'blur', validator: validateMinLength }
        ],
        newPassword: [
          { required: true, trigger: 'blur', validator: validateMinLength }
        ],
        newPassword2: [
          { required: true, trigger: 'blur', validator: validateEqualPassword }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.updatePasswordForm.validate(async valid => {
        if (!valid) return false
        try {
          this.loading = true
          const { oldPassword, newPassword } = this.updatePasswordForm
          await updatePassword({ oldPassword, newPassword })

          this.$message({
            message: 'User information has been updated successfully',
            type: 'success',
            duration: 5 * 1000
          })
        } finally {
          this.loading = false
          this.updatePasswordForm.oldPassword = ''
          this.updatePasswordForm.newPassword = ''
          this.updatePasswordForm.newPassword2 = ''
        }
      })
    }
  }
}
</script>
