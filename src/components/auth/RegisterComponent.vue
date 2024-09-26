<template>
  <div>
<slot></slot>
    <v-snackbar
        v-model="snackbar.open"
        centered
        :vertical="true"
        timeout="4000"
      >{{snackbar.msg}}</v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
   <v-row justify="center">
    <v-dialog
      v-model="$attrs.dialog"
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
          <span class="text-h5">Register</span>
        </v-card-title>
        <v-card-text style="color:red;padding-bottom:0px;">{{error}}</v-card-text>
        <v-card-text style="padding-top:0px">
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

                <v-text-field
                  v-model="cpwordRef"
                  :rules="cpasswordRules"
                  label="Confirm Password"
                  required
                ></v-text-field>
              </v-col>
          </v-row>
  </v-container>    
  </v-card-text>
  <v-card-actions>
    <v-btn
      color="warning"
      @click="handleRegisterSubmit"
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
import UserService from '../../services/UserService';

export default {
  components: {},
    data: function() {
      return {
        loading: false,
        snackbar: {
          open: false,
          msg: ''
        },
        error: '',
        dialog: false,
        doRegister: false,
      // token: this.checkToken(),
        userModel: {
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
        adminId: '',
      // appBarColor: this.getColor(),
        valid: true,
        unameRef: '',
        pwordRef: '',
        cpwordRef: '',
        nameRules: [
          v => !!v || 'User Name is required',
        ],
        passwordRules: [
          v => !!v || 'Password is required',
        ],
        cpasswordRules: [
          v =>  this.pwordRef ? v === this.pwordRef 
            || 'Passwords must match' : 'Password is required'
        ],
      }
    },
    methods: {
      toggleRegister () {
        this.doRegister = true;
      },
      validate () {
        this.$refs.form.validate()
      },
      handleRegisterSubmit () {
        if(this.valid) {
          this.loading = true;
          this.error = '';
          this.userModel = {
            userName: this.unameRef.valueOf(),
            password: this.pwordRef.valueOf(),
            role: 'user'
          }
          UserService.registerUser(this.userModel)
          .then(response => {
                if(response.ok) {
                  this.handleSuccess();
                } else {
                  if (response.status === 409)  {
                    this.error = 'User already exists. Please try another user' 
                  } else {
                    this.error = 'Account creation failed.  Please try again.'
                  }
                }
                this.userModel = {};
                this.$refs.form.reset();
                this.loading = false;
            })
            .catch();
        }
      },
      handleSuccess() {
        this.snackbar.msg = 'Success! User account created! You can now login.';
        this.snackbar.open = true;
        this.$parent.doRegister = false;
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
    },
}
</script>