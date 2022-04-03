<template>
  <div>
    <catalog-home :logout="userLogout"></catalog-home>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'; 
import CatalogHome from '../../components/catalog/CatalogHome.vue';

export default {
  components: {
    CatalogHome  
  },
  name: 'ItemDashView',
  data() {
    return {
      loading: false,
      msg: '',
      snackbar: {
        open: false,
        msg: ''
      },
      cardList: this.getCardList(),
    }
  },
  methods: {
    ...mapMutations(['logout']),
    userLogout() {
      this.logout;
      this.$router.push('/');
    },
    handleResponseError(error, method) {
      console.log(error+": "+method);
    },

    handleSuccess(action, entity) {
      this.updateView(action, entity);
    },

    updateView(action, entity) {
      //TODO decide whether to make these functions state dependent by using this.action, this.entity
      //toggle form----------
      //refresh list------------
      if (entity === 'person') {
        //this.selectedPersonList = [];
    //    this.getPersonList();
      }

      if (entity === 'person') {
        //get person list
      }
    },
    getCardList() {
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
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .wrapper {
        width: 1000px;
        display: flex;
        flex-wrap: wrap;
    }
    .wrapper .row {
      margin-top: 15%;
    } 
    .wrapper > div > div {
        flex: 1 1 30%;
        height: 200%;
        margin: .1% .2%;
    }
    .theme--light {
        .v-card{
            background-color: transparent;
            box-shadow: none;
        }
     }
</style>