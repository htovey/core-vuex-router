<template>
    <v-toolbar class="float-right">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="deleteItem()"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </template>
            Delete Item
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="openItem(true)"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </template>
            Add Item
        </v-tooltip>  
    </v-toolbar>    
</template>
<script>
import ItemService from '../../services/ItemService'
    export default {
        
        data () {
            return {
                componentName: '',
            }
        },
        methods: {
            getParent () {
                return this.$parent.$parent.$parent;
            },
            openItem (create) {
               this.$attrs.openItem(create); 
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
     .theme--light {
        .v-toolbar .v-sheet {
            background-color: transparent;
            box-shadow: none;
        }
     }
</style>