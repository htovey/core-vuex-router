<template>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="this.$parent.itemlist"
        :items-per-page="10"
        class="elevation-1"
        show-select
        :single-select="false"
        @input="handleRowSelection"
    ></v-data-table>
</template>
<script>
export default {
    data() {
        return {
            componentName: '',
            headers: [
                {
                    text: 'ID',
                    value: 'id',
                    align: 'start',
                    sortable: false
                },
                {
                    text: 'Item Name',
                    value: 'name'
                },
                {
                    text: 'Date Updated',
                    value: 'saveDate'
                },
                {
                    text: 'Type',
                    value: 'type'
                }
            ],
            selected: []
        }
    },
    methods: {
        handleRowSelection () {
            console.log('data row selected ***');
            //update buttons if more than one row is selected
            //send row ids to parent for crud actions
            this.$parent.updateRowSelection(this.selected);
        }
    }
}
</script>