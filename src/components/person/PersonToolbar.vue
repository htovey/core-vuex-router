<template>
    <v-app-bar class="float-right">
        <!-- <v-tooltip bottom> -->
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                    @click="deletePerson()"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-delete-outline</v-icon>
                </v-btn>
            </template>
            Delete Person -->
        <!-- </v-tooltip> -->
        <!-- <v-tooltip bottom> -->
            <!-- <template v-slot:activator="{ on, attrs }"> -->
                <v-btn
                    @click="openPerson(true)"
                >
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            <!-- </template> -->
            Add Person
        <!-- </v-tooltip>   -->
    </v-app-bar>    
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
            openPerson (create) {
               this.$attrs.openPerson(create); 
            },
            deletePerson() {
                let personList = this.$attrs.selectedPersonList;
                BizService.deleteBiz(this.$store.userToken, personList)
                .then(response => {
                    if (response.ok) {
                        this.handleSuccess('delete', 'person');
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