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
                @click="this.adminLogout"
              >LOGOUT</v-btn>
              <v-btn
                v-if="this.selectedItemList.length === 1"
                    @click="this.openItem"
                >
                    <v-icon>mdi-launch</v-icon>
                </v-btn>
            </v-toolbar>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
          <item-toolbar  
            :openItem="this.openItem" 
            :selectedItemList="selectedItemList"
            :handleSuccess="this.handleSuccess"
          ></item-toolbar>
          </v-col>
        </v-row>
      </v-app-bar>
    </template>   
    <template v-if="this.openItemForm"> 
      <item-dialog 
        :actionType="this.actionType"
        :selectedItem="selectedItemList[0]"
        :handleItemSubmit="handleItemSubmit"></item-dialog>
    </template>
    <template v-else>
      <v-overlay :value="loading">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <item-list-component :itemList="this.itemList"></item-list-component>
    </template>
  </div>
</template>
<script>
import ItemListComponent from '../../components/item/ItemListComponent.vue';
import ItemDialog from '../../components/item/ItemDialog.vue';
import ItemToolbar from '../../components/item/ItemToolbar.vue';
import ItemService from '../../services/ItemService';
import ImageService from '../../services/ImageService';
import { mapMutations } from 'vuex';
 
export default {
  components: { 
    ItemDialog,
    ItemListComponent,
    ItemToolbar
  },
  name: 'AdminDashView',
  data() {
    return {
      loading: true,
      msg: '',
      itemList: [],
      actionType: '',
      selectedItemList: [],
      openItemForm: false,
      snackbar: {
        open: false,
        msg: ''
      }
    }
  },
  methods: {
    ...mapMutations(['logout']),
    beforeMount() {
      console.log('before mount');
    },
    beforeCreate() {
      console.log('beforeCreate()');
    },
    created() {
      console.log('CREATED');
    },
    adminLogout() {
      this.logout;
      this.$router.push('/');
    },
    getItemList() {
    //  this.loading = true;
      ItemService.getItemList(this.$store.getters.token)
      .then(response => {
        const headers = response.headers;
        response.json()
        .then(json => {
        if (response.ok) {
          //this.itemlist = json
          this.buildItemListTable(json);
        } else {
          var error = headers.get('TokenError');
          this.handleResponseError(error, 'getItemList');
        }
        })
      })
      .catch((error) => {
        return error;
      })
      .finally(() => {
        this.loading = false;
      });
    },

    buildItemListTable(itemJson) {
      var myItemList = [];
      itemJson.map(function(item) { 
        myItemList.push(item);
      })
      console.log('set item list in state');
      this.itemList = myItemList;
     // this.$store.itemList = myItemList;
       console.log('LIST length: '+this.itemList.length);
    },

    handleResponseError(error, method) {
      console.log(error+": "+method);
    },

    openItem(create) {
        if (create === true){
            this.actionType = 'create';
        } else {
            this.actionType = 'update';
        }
        this.openItemForm = true;
    },

    toggleItem() {
        this.openItemForm = !this.openItemForm;
        if (!this.openItemForm) {
          this.selectedItemList = [];
        }
    },

    handleItemSubmit(item, newImageList) {
        ItemService.createUpdateItem(
          this.userToken,
          this.actionType,
          item
        ).then(response => {
          if (response.ok) {
            if (newImageList.length > 0) {
              ImageService.saveImageLinks(this.userToken, newImageList)
                .then(() => {
                  this.handleSuccess(this.actionType, 'item');
                });
            }
          }
        }).catch(error => console.log(error));
        
    },

    handleSuccess(action, entity) {
      this.snackbar.msg = 'Success!';
      this.snackbar.open = true;
      this.updateView(action, entity);
    },

    updateView(action, entity) {
      //TODO decide whether to make these functions state dependent by using this.action, this.entity
      //toggle form----------
      if (action !== 'delete') {
        if (entity === 'item') {
          this.toggleItem();
        }

        if (entity === 'person') {
          ///close person form
        }
      }

      //refresh list------------
      if (entity === 'item') {
        this.selectedItemList = [];
        this.getItemList();
      }

      if (entity === 'person') {
        //get person list
      }
    },

    updateRowSelection(selection) {
      this.selectedItemList = selection;   
    },

    updateItem () {},

    launchItemPage() {
     // let launchItem = this.itemList[this.props.selectedRows.data[0].index];
      //this.props.loadItemDashboard(launchItem.id);
      this.$store.selectedItem = this.selectedItemList[0];
      this.$router.push('/item');
    }

  },

  created() {
    this.itemList = this.getItemList();
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $color: rgb(57, 75, 57);
 // .theme--light {
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
    .v-toolbar .v-btn {
      margin-left: 10px;
    }
    .v-btn {
      margin-left: 10px;
    }
 // }
</style>


