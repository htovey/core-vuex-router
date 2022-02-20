<template>
  <div>
  <slot>  </slot>
   <v-row justify="center">
    <v-dialog
      v-model="$attrs.dialog"
      persistent
      max-width="600px"
    >
  <v-form
    ref="form"
    @keyup.enter.native="handleLoginSubmit"
  >
   <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <h2 style="color: red;">{{errorMessage}}</h2>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="unameRef"
                  :counter="10"
                  :rules="nameRules"
                  label="User Name"
                  @focus="resetError"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="pwordRef"
                  :rules="passwordRules"
                  label="Password"
                  @focus="resetError"
                  required
                ></v-text-field>
              </v-col>
          </v-row>
  </v-container>    
  </v-card-text>
  <v-card-actions>
    <v-btn
      color="success"
      class="mr-4"
      @click="handleLoginSubmit"
    >
      Login
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Password
    </v-btn>

    <v-btn
      color="warning"
      @click="$attrs.register"
    >
      Register
    </v-btn>
  </v-card-actions>
   </v-card>
  </v-form>
  </v-dialog>
   </v-row>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import LoginService from '../../services/LoginService';

export default {
    data: () => ({
     errorMessage: '', 
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
      itemId: '',
      adminId: '',
      valid: true,
      nameRules: [
        v => !!v || 'User Name is required',
      ],
      unameRef: '',
      pwordRef: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }),

    methods: {
      ...mapActions(['login']),
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

      handleLoginSubmit () {
        if(this.valid) {
          let uname = this.unameRef.valueOf();
          let password = this.pwordRef.valueOf();
          LoginService.submitLogin(uname, password)
          .then((response) => {
            //this.reset();
            if (response.status === 200) {
              var userToken = response.headers.get('authorization');
              response.json()
              .then((json) => {
                this.handleLoginSuccess(userToken, json);
              });
            } else if (response.status === 401) {
              this.handleError('Invalid Username or Password.  Please try again.');
            }
          })    
          .catch(() => {
              this.handleError('Login failed. Please try again.');
          });
        }
      },

      handleLoginSuccess(token, loginJson) { 
        this.login(token);
        this.setPersonModel(loginJson.person);
        this.setLoginModel(loginJson.user);
        this.role = loginJson.user.role;

        localStorage.setItem('role', this.role);
        localStorage.setItem('token', token);
        let route = "/item";
        if (this.role === 'admin') {
          route = "/admin"
        }
        this.$router.push(route);
      },

      handleError(msg){
        this.errorMessage = msg;
      },

      resetError() {
        this.errorMessage = '';
      },
      checkToken() {
        let localToken = localStorage.getItem('token');
        if (localToken) {
          return localToken;
        }
          return '';
      },

      setPersonModel(personJson) {
        this.personModel = {
          id: personJson ? personJson.id : '',
          fName: personJson ? personJson.fName : '',
          lName: personJson ? personJson.lName : ''
        }
      },

      setLoginModel(userJson) {
        this.loginModel = {
          userId: userJson ? userJson.userId : '',
          userName: userJson ? userJson.userName : '',
          role: userJson ? userJson.role : '',
        }
        this.roleModel = {
          id: userJson ? userJson.roleId : '',
          roleName: userJson ? userJson.roleName : '',
          roleType: userJson ? userJson.roleType : ''        
        }
      },
    },
}
</script>