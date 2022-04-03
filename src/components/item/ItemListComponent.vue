<template>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="$attrs.itemList"
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
            itemList: this.$attrs.itemList,
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
                    text: 'Category',
                    value: 'category'
                },
                // {
                //     text: 'url',
                //     value: 'imageUrl'
                // }
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