<template>
  <div>
    <template>
      <!-- <v-snackbar
        v-model="snackbar.open"
        centered
        :vertical="true"
        timeout="4000"
      >{{snackbar.msg}}</v-snackbar> -->
    </template>
    <template>  
      <v-app-bar 
        app
        color="navy"
      >
        <v-row class="toolbar-row">
          <v-col>
            <!-- <v-img
            src="./assets/speedometer5.png"
            width="40"
            /> -->
            <!-- <v-toolbar class="float-left"> -->
              <v-btn
                @click="this.adminLogout"
              >LOGOUT</v-btn>
            <!-- </v-toolbar> -->
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
          <person-toolbar  
            :openPerson="this.openPerson" 
            :selectedPersonList="selectedPersonList"
            :handleSuccess="this.handleSuccess"
          ></person-toolbar>
          </v-col>
        </v-row>
      </v-app-bar>
    </template>   
    <template v-if="this.openPersonForm"> 
      <person-dialog :actionType="this.actionType"></person-dialog>
    </template>
    <template v-else>
      <person-list-component></person-list-component>
    </template>
  </div>
</template>
<script>
import PersonListComponent from '../../components/person/PersonListComponent.vue';
import PersonDialog from '../../components/person/PersonDialog.vue';
import PersonToolbar from '../../components/person/PersonToolbar.vue';
import PersonService from '../../services/PersonService';
import { mapMutations } from 'vuex'; 
import BizService from '../../services/BizService';

export default {
  components: { 
    PersonDialog,
    PersonListComponent,
    PersonToolbar
  },
  name: 'BizDashView',
  data() {
    return {
      msg: '',
      personList: this.getPersonList(['user']),
      roleList: this.getRoleList(),
      actionType: '',
      selectedPersonList: [],
      openPersonForm: false,
      snackbar: {
        open: false,
        msg: ''
      },
      userRoleId: ''
    }
  },
  methods: {
    ...mapMutations(['logout']),
    adminLogout() {
      this.logout;
      this.$router.push('/');
    },
    getRoleList() {
      let bizId = this.$store.profile.bizId;
      BizService.getBizRoles(bizId, this.$store.userToken)
       .then(response => response.json())
        .then(json => {
           this.setRoleList(json);
        })
        .catch((error) => {
          console.log(error);
          this.handleError('get role list failed. Please try again.');
        });
    },
    setRoleList(roles) {
      var myList = [];
      var userroleid;
      roles.map(function(role) {
        if (role.type === 'USER') {
          userroleid = role.id;
        } 
        myList.push(role);
      });
      this.roleList = myList; 
      this.userRoleId = userroleid;
    },
    getPersonList(roleTypes) {
      let bizId = this.$store.profile.bizId;
      PersonService.getPersonList(bizId, roleTypes, this.$store.userToken)
      .then(response => {
        const headers = response.headers;
        response.json()
        .then(json => {
          if (response.ok) {          
            //this.toggleListView(roleType, json);
            this.personList = json;
          } else {
            var error = headers.get('TokenError');
            this.getParent().handleResponseError(error, 'getPersonList');
          }  
        })
      })
      .catch((error) => {
          return error;
      });
    },
    getUserList() {
      this.getPersonList(this.$attrs.bizId, ['USER']);
      this.setState({showPersonList: true});
    },
    getAdminList() {
      this.getPersonList(this.$attrs.bizId, ['ADMIN']);
    },
    buildPersonListTable(personJson) {
      var myPersonList = [];
      personJson.map(function(person) { 
        myPersonList.push(person);
      })
      console.log('set person list in state');
      this.personlist = myPersonList;
      console.log('BIZ LIST length: '+this.personlist.length);
    },

    handleResponseError(error, method) {
      console.log(error+": "+method);
    },

    openPerson(create) {
        if (create === true){
            this.actionType = 'create';
        } else {
            this.actionType = 'update';
        }
        this.openPersonForm = true;
    },

    togglePerson() {
        this.openPersonForm = !this.openPersonForm;
    },

    handlePersonSubmit(person) {
        PersonService.createUpdatePerson(
          this.$attrs.token,
          this.actionType,
          person.name,
          person.type,
          person.id,
        ).then(response => {
          if (response.ok) {
            this.handleSuccess(this.actionType, 'person');
          }
        }).catch(error => console.log(error));
        
    },

    handleSuccess(action, entity) {
      var actionType = 'created';
      var entityType = 'User';
      if (action === 'update') {
        this.actionType = 'updated';
      }

      if (action === 'delete') {
        actionType = 'deleted'
      }

      if (entity === 'person') {
        entityType = 'Business'
      }

      this.snackbar.msg = 'Success! '+entityType+' has been '+actionType+'.';
      this.snackbar.open = true;
      this.updateView(action, entity);
    },

    updateView(action, entity) {
      //TODO decide whether to make these functions state dependent by using this.action, this.entity
      //toggle form----------
      if (action !== 'delete') {
        if (entity === 'person') {
          this.togglePerson();
        }

        if (entity === 'person') {
          ///close person form
        }
      }

      //refresh list------------
      if (entity === 'person') {
        this.selectedPersonList = [];
    //    this.getPersonList();
      }

      if (entity === 'person') {
        //get person list
      }
    },

    updateRowSelection(selection) {
      this.selectedPersonList = selection;   
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  $color: rgb(57, 75, 57);
  .theme--light {
    h3 {
      margin: 40px 0 0;
      color: $color;
    }
    a {
      color: #42b983;
    }
    .v-toolbar .v-sheet {
      background-color: transparent;
      box-shadow: none;
    }
  }
</style>