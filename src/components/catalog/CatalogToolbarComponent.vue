<template>
    <v-toolbar class="float-left">
        <v-toolbar-title>Browse Catalog</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            @click="this.$attrs.logout"
        >LOGOUT</v-btn>
    </v-toolbar>   
</template>
<script>
import ItemService from '../../services/ItemService';

    export default {
        
        data () {
            return {
                componentName: '',
                selectedItemList: [],
            }
        },
        methods: {
            // ...mapMutations(['logout']),
            getParent () {
                return this.$parent.$parent.$parent;
            },
            deleteItem() {
                let itemList = this.$attrs.selectedItemList;
                ItemService.deleteItem(this.$store.userToken, itemList)
                .then(response => {
                    if (response.ok) {
                        this.handleSuccess('delete', 'item');
                    }
                });        
            },
            handleSuccess(action, entity) {
                this.$attrs.handleSuccess(action, entity)
            }
        }
    }
</script>
<style lang="scss" scoped>
     //.theme--light {
        .v-toolbar {
            background-color:   #5b5ba0;
            box-shadow: none;
            width: 100%;
        }
     //}
</style>