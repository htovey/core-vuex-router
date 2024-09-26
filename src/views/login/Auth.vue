<template>
  <div>
    <login-component
     :dialog="!doRegister"
     :register="toggleRegister">
    </login-component>
    <register-component :dialog="doRegister">
    </register-component>
  </div>
</template>
<script>
import LoginComponent from '../../components/auth/LoginComponent.vue';
import RegisterComponent from '../../components/auth/RegisterComponent.vue';

export default {
  components: { LoginComponent, RegisterComponent},
    data: () => ({
      dialog: true,
      doRegister: false,
     // token: this.checkToken(),
      loginModel: {
        userId: '',
        userName: '',
        password: '',
        role: ''
      },
      roleModel: {
        id: '',
        roleName: '',
        roleType: '',
      },
      personModel: {
        id: '',
        fName: '',
        lName: ''
      },
      actionType: '',
      role: '',
    }),

    methods: {
      toggleRegister () {
        this.doRegister = !this.doRegister;
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      getParent () {
          return this.$parent.$parent.$parent;
      },
    },
}
</script>
