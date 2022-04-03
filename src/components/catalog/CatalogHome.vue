<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-card>
      <v-card-title>
        <catalog-toolbar-component 
          :logout="this.$attrs.logout"
          :selectedItemList="selectedItemList"></catalog-toolbar-component>
      </v-card-title>    
    <template>
      <v-tabs
        color="deep-purple accent-4"
        right
        align-with-title
      >
        <v-tab
          v-for="tab in tabList"
          :key="tab.label"
          @click=selectCategory(tab.class)
        >{{tab.label}}</v-tab>   
        <v-tab-item
          v-for="n in 6"
          :key="n"
        >
          <v-container fluid>
            <v-row>
              <v-col
                v-for="i in 6"
                :key="i"
                cols="12"
                md="4"
              >          
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </template>
    </v-card>
    <catalog-collection 
      v-if="showCategory" 
      :itemList="itemList">
    </catalog-collection>
    </div>
</template>
<script>
import CatalogToolbarComponent from '../../components/catalog/CatalogToolbarComponent.vue';
import ItemService from '../../services/ItemService';
import CatalogCollection from './CatalogCollection.vue';

export default {
  components: {
    CatalogToolbarComponent,
    CatalogCollection,
  },
  name: 'CatalogHome',
  data() {
    return {
      itemList: [],
      loading: false,
      showCategory: false,
      category: '',
      msg: '',
      snackbar: {
        open: false,
        msg: ''
      },
      tabList: this.getTabList(),
      selectedItemList: [],
    }
  },
  methods: {
    selectCategory(category) {
      this.showCategory = false;
      this.loading = true;
      this.itemList = [];
      this.category = category;
      this.getItemList();
    },
    getTabList() {
      return [
        {
          class: 'cars',
          path: '/catalog/cars',
          label: 'Cars'
        },
                {
          class: 'coins',
          path: '/catalog/coins',
          label: 'Coins'
        },
                {
          class: 'guns',
          path: '/catalog/guns',
          label: 'Guns'
        },
                {
          class: 'knives',
          path: '/catalog/knives',
          label: 'Knives'
        },
        {
          class: 'other',
          path: '/catalog/other',
          label: 'Other'
        },
        {
          class: 'tools',
          path: '/catalog/tools',
          label: 'Tools'
        },
      ];
    },
    getItemList() {
      this.loading = true;
      ItemService.getItemList(this.$store.getters.token, this.category)
      .then(response => {
          const headers = response.headers;
          response.json()
          .then(json => {
          if (response.ok) {
             //this.itemlist = json
            this.handleSuccess(json);
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
    buildItemList(itemJson) {
      var myItemList = [];
      itemJson.map(function(item) { 
          myItemList.push(item);
      })
      console.log('set item list in state');
      this.itemList = myItemList;
      this.$store.itemList = myItemList;
      return true;
    },
    handleSuccess(json) {
      if (this.buildItemList(json)) {
        this.showCategory = true;
        this.loading = false;
      }
    },
    handleResponseError(error, method) {
      console.log(error+": "+method);
    },
    toggleItem() {
      this.openItemForm = !this.openItemForm;
      if (!this.openItemForm) {
        this.selectedItemList = [];
      }
    },
    updateItemSelection(selection) {
      this.selectedItemList = selection;   
    },
    launchItemPage() {
     // let launchItem = this.itemList[this.props.selectedRows.data[0].index];
      //this.props.loadItemDashboard(launchItem.id);
      this.$store.selectedItem = this.selectedItemList[0];
      this.$router.push('/item');
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    // .wrapper {
    //     width: 1000px;
    //     display: flex;
    //     flex-wrap: wrap;
    // }
    // .wrapper .row {
    //   margin-top: 15%;
    // } 
    // .wrapper > div > div {
    //     flex: 1 1 30%;
    //     margin: .1% .2%;
    // }
    .theme--light {
        .v-card{
            background-color: transparent;
            box-shadow: none;
        }
     }
</style>