<template>
    <v-toolbar class="float-right">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="deleteBiz()"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </template>
            Delete Biz
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="openBiz(true)"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </template>
            Add Biz
        </v-tooltip>  
    </v-toolbar>    
</template>
<script>
import BizService from '../../services/BizService'
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
            openBiz (create) {
               this.$attrs.openBiz(create); 
            },
            deleteBiz() {
                let bizList = this.$attrs.selectedBizList;
                BizService.deleteBiz(this.$store.userToken, bizList)
                .then(response => {
                    if (response.ok) {
                        this.handleSuccess('delete', 'biz');
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
    //  .theme--light {
    //     .v-toolbar .v-sheet {
    //         background-color: transparent;
    //         box-shadow: none;
    //     }
    //  }
</style>