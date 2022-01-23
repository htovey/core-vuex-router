<template>
     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    
  >
    <v-text-field
      v-model="itemNameRef"
      ref="itemNameRef"
      :counter="10"
      :rules="nameRules"
      label="Item Name"
      required
    ></v-text-field>

    <v-select 
      v-model="itemCategoryRef"
      ref="itemCategoryRef"
      label="Category"
      required
      :items="itemCategoryList"
      :rules="categoryRules"  
    >
    </v-select>    

       <v-text-field
      v-model="itemDescRef"
      ref="itemDescRef"
      :counter="10"
      label="Description"
      required
    ></v-text-field>

    <v-btn
      color="success"
      class="mr-4"
      @click="itemFormSubmit"
    >
      Save
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="cancel"
    >
        Cancel
    </v-btn>

  </v-form>
</template>
<script>
import { CATEGORIES } from '../../constants/ItemCategories';

export default {
    data() {
      return {
        valid: true,
        item: this.$attrs.selectedItem,
        actionType: this.$parent.actionType,
        itemNameRef: this.item ? this.item.name : '',
        itemCategoryRef: this.item ? this.item.category : '',
        itemDescRef: this.item ? this.item.description : '',
        nameRules: [
          v => !!v || 'Item Name is required',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        categoryRules: [
          v => !!v || 'Item category is required',
        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        itemCategoryList: this.buildItemCategoryList(),
      }
    },
    methods: {
        itemFormSubmit() {
          let item = {
            "name": this.itemNameRef,
            "category": this.itemCategoryRef,
            "description": this.itemDescRef,
            "id": this.itemid
          }
          this.$parent.handleItemSubmit(item);
        },
        
        cancel() {
          this.$parent.toggleItem();
        },

        buildItemCategoryList() {
          let itemCategoryList = CATEGORIES.map(function(itemCategory) {
            if (itemCategory.value === '') {
              // return <MenuItem classes={{"root": "disabledItem"}} disabled key={itemCategory.value} value={itemCategory.value}>{itemCategory.label}</MenuItem>
              return ''
            }
            // return <MenuItem key={itemCategory.value} value={itemCategory.value}>{itemCategory.label}</MenuItem>
            return {text: itemCategory.label, value: itemCategory.value}
          });
          return itemCategoryList;
        }
    }
}
</script>