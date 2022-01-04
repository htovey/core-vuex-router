<template>
  <div>
    <template>
      <v-snackbar
        v-model="snackbar.open"
        centered
        :vertical="true"
        timeout="4000"
      >{{snackbar.msg}}</v-snackbar>
    </template>
    <template>  
      <v-app-bar 
        app
        color="orange"
      >
        <v-row class="toolbar-row">
          <v-col>
            <!-- <v-img
            src="./assets/speedometer5.png"
            width="40"
            /> -->
            <v-toolbar class="float-left">
              <v-btn
                @click="this.bizLogout"
              >LOGOUT</v-btn>
              <v-btn
                v-if="this.selectedBizList.length === 1"
                    @click="this.launchBiz"
                >
                    <v-icon>mdi-launch</v-icon>
                </v-btn>
            </v-toolbar>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
          <biz-toolbar  
            :openBiz="this.openBiz" 
            :selectedBizList="selectedBizList"
            :handleSuccess="this.handleSuccess"
          ></biz-toolbar>
          </v-col>
        </v-row>
      </v-app-bar>
    </template>   
    <template v-if="this.openBizForm"> 
      <biz-dialog :actionType="this.actionType"></biz-dialog>
    </template>
    <template v-else>
      <biz-list-component></biz-list-component>
    </template>
  </div>
</template>
<script>
import BizListComponent from '../../components/biz/BizListComponent.vue';
import BizDialog from '../../components/biz/BizDialog.vue';
import BizToolbar from '../../components/biz/BizToolbar.vue';
import BizService from '../../services/BizService';
import { mapMutations } from 'vuex';
 
export default {
  components: { 
    BizDialog,
    BizListComponent,
    BizToolbar
  },
  name: 'AdminDashView',
  data() {
    return {
      msg: '',
      bizlist: this.getBizList(),
      actionType: '',
      selectedBizList: [],
      openBizForm: false,
      snackbar: {
        open: false,
        msg: ''
      }
    }
  },
  methods: {
    ...mapMutations(['logout']),
    bizLogout() {
      this.logout;
      this.$router.push('/');
    },
    getBizList() {
      BizService.getBizList(this.$store.userToken)
      .then(response => {
        const headers = response.headers;
        response.json()
        .then(json => {
        if (response.ok) {
          //this.bizlist = json
          this.buildBizListTable(json);
        } else {
          var error = headers.get('TokenError');
          this.handleResponseError(error, 'getBizList');
        }
        })
      })
      .catch((error) => {
        return error;
      });
    },

    buildBizListTable(bizJson) {
      var myBizList = [];
      bizJson.map(function(biz) { 
        myBizList.push(biz);
      })
      console.log('set biz list in state');
      this.bizlist = myBizList;
      console.log('BIZ LIST length: '+this.bizlist.length);
    },

    handleResponseError(error, method) {
      console.log(error+": "+method);
    },

    openBiz(create) {
        if (create === true){
            this.actionType = 'create';
        } else {
            this.actionType = 'update';
        }
        this.openBizForm = true;
    },

    toggleBiz() {
        this.openBizForm = !this.openBizForm;
    },

    handleBizSubmit(biz) {
        BizService.createUpdateBiz(
          this.$store.userToken,
          this.actionType,
          biz.name,
          biz.type,
          biz.id,
        ).then(response => {
          if (response.ok) {
            this.handleSuccess(this.actionType, 'biz');
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

      if (entity === 'biz') {
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
        if (entity === 'biz') {
          this.toggleBiz();
        }

        if (entity === 'person') {
          ///close person form
        }
      }

      //refresh list------------
      if (entity === 'biz') {
        this.selectedBizList = [];
        this.getBizList();
      }

      if (entity === 'person') {
        //get person list
      }
    },

    updateRowSelection(selection) {
      this.selectedBizList = selection;   
    },

    launchBiz() {
     // let launchBiz = this.bizList[this.props.selectedRows.data[0].index];
      //this.props.loadBizDashboard(launchBiz.id);
      this.$store.profile.bizId = this.selectedBizList[0].id;
      this.$router.push('/biz');
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


