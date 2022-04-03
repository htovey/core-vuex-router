<template>
    <div>
        <v-container fluid v-if="!openItemForm">
        <v-row dense>
            <v-col
            v-for="card in itemList"
            :key="card.id"
            :cols="card.flex"
            >
            <v-card>
                <v-img
                :src="card.imageUrl"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                >
                <v-card-title v-text="card.name"></v-card-title>
                </v-img>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="openItem('read', card)">
                        <v-icon>mdi-launch</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
        </v-container>
        <template v-if="openItemForm"> 
            <item-dialog 
                :actionType="actionType"
                :selectedItem="selectedItem"></item-dialog>
        </template>
    </div>
</template>
<script>

import ItemDialog from '../item/ItemDialog.vue';

export default {
    components: {
        ItemDialog,
    },
    data() {
        return {
            userToken: this.$store.getters.token,
            loading: false,
            msg: '',
            itemList: this.$attrs.itemList,
            actionType: '',
            selectedItem: null,
            openItemForm: false,
        }
    },
    methods: {

        updateItem () {},
                
        openItem (actionType, item) {
           this.actionType = actionType; 
           this.selectedItem = item;
           this.openItemForm = true;
        },
        launchItemPage() {
        // let launchItem = this.itemList[this.props.selectedRows.data[0].index];
        //this.props.loadItemDashboard(launchItem.id);
        this.$store.selectedItem = this.selectedItemList[0];
        this.$router.push('/item');
        }
    },
}
</script>
<style lang="scss" scoped>
    
</style>