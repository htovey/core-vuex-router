<template>
      <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @keyup.enter.native="handlePersonSubmit"
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

    <v-select
        v-model="roleRef"
        :items="roleList"
        item-text="name"
        item-value="id"
        placeholder="User Role"
        required
    ></v-select>
    <v-text-field
      v-model="fnameRef"
      :counter="10"
      :rules="nameRules"
      label="First Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="lnameRef"
      :counter="10"
      :rules="nameRules"
      label="Last Name"
      required
    ></v-text-field>
    <v-btn
      color="success"
      class="mr-4"
      @click="handlePersonSubmit"
    >
      Save
    </v-btn>
    <v-btn
        color="error"
        class="mr-4"
        @click="cancelPersonSubmit"
    >
        Cancel
    </v-btn>
  </v-form>
</template>
<script>
import UserService from '../../services/UserService';
import PersonService from '../../services/PersonService';

export default {
    name: 'PersonDialog',
    data () {
        return {
            valid: true,
            nameRules: [
                v => !!v || 'User Name is required',
            ],
            unameRef: '',
            pwordRef: '',
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            error: '',
            fnameRef: '',
            lnameRef: '',
            roleRef: '',
            placeHolder: '',
            createLogin: true,
            // createProfile: false,
            roleList: this.$parent.roleList,
            showProfile: false,
            personModel: {},
            userModel: {}
        }
    },
    methods: {
        handlePersonSubmit () {
            const token = this.$store.userToken;
            let action = this.$parent.actionType;
            this.personModel = {
                'fName' : this.fnameRef,
                'lName' : this.lnameRef,
                'userName' : this.unameRef
            }
            this.userModel = {
                'userName': this.unameRef,
                'password': this.pwordRef,
                'role': 'user∂',
            };
            UserService.createUser(this.userModel, token, action)
            .then(response => {
                if(response.ok) {
                    PersonService.createUpdatePerson(token, action, this.personModel)
                    .then()
                    .catch();
                }
            })
            .catch();          
        },
        cancelPersonSubmit () {
            this.personModel = {};
            this.userModel = {};
            this.$parent.openPersonForm = false;
        },
    },
}
</script>