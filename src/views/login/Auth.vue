<template>
   <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @keyup.enter.native="handleLoginSubmit"
  >
   <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
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
                  required
                ></v-text-field>

                <v-text-field
                  v-model="pwordRef"
                  :rules="passwordRules"
                  label="Password"
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
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
  </v-card-actions>
   </v-card>
  </v-form>
  </v-dialog>
   </v-row>
</template>
<script>
import LoginService from '../../services/LoginService';

export default {
    data: () => ({
      dialog: true,
     // token: this.checkToken(),
      loginModel: {
        userId: '',
        userName: '',
        password: '',
        roleId: '',
        bizId: '',
        adminId: ''
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
      bizId: '',
      adminId: '',
     // appBarColor: this.getColor(),
      selectedBizList: [],
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
            var userToken = response.headers.get('authorization');
            response.json()
            .then((json) => {
              this.handleLoginSuccess(userToken, json);
            //this.props.handleLoginSuccess(json, userToken);
            });
          })    
          .catch(() => {
              this.handleError('Login failed. Please try again.');
          });
        }
      },

      handleLoginSuccess(token, loginJson) {
        this.$store.userToken = token; 
        this.setPersonModel(loginJson.person);
        this.setLoginModel(loginJson.user);
        this.role = loginJson.user.roleType;
        this.bizId = loginJson.user.bizId;

        localStorage.setItem('role', this.role);
        localStorage.setItem('token', token);
        let route = "/biz";
        if (this.role === 'SUPER') {
          route = "/admin"
        }
        this.$router.push(route);
      },

      handleError(msg){
        console.log(msg+' LoginComponent handleError()');
        // if(this.props.openLogin === true) {
        //     this.setState({ 
        //       error: msg,
        //       loading: false
        //     });
        // }
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
        roleId: userJson ? userJson.roleId : '',
        bizId: userJson ? userJson.bizId : '',
        adminId: userJson ? userJson.adminId : ''
      },
      this.roleModel = {
        id: userJson ? userJson.roleId : '',
        roleName: userJson ? userJson.roleName : '',
        roleType: userJson ? userJson.roleType : ''        
      },
      this.adminId = userJson ? userJson.adminId : '',
      this.$store.profile = {
        bizId: userJson.bizId,
        role: userJson.roleType
      },
      this.$store.adminId = userJson.userId
    },
    },
  }
</script>
