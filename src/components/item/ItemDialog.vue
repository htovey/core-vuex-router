<template>
<div>
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
    <!-- <v-img 
      class="image-window"
      v-model="itemImgRef"
      :src="itemImgRef">
    </v-img> -->
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
  <image-panel :imageList="itemImageList"></image-panel>
  <image-upload :newImageList="newImageList"></image-upload>
</div>
</template>
<script>
import { CATEGORIES } from '../../constants/ItemCategories';
import ImageUpload from '../../components/ImageUploadComponent.vue';
import ImagePanel from '../../components/ImagePanelComponent.vue';
import ImageService from '../../services/ImageService';

export default {
  components: { 
    ImageUpload,
    ImagePanel
  },
  data() {
    return {
      caption: '',
      valid: true,
      //item: this.$attrs.selectedItem,
      actionType: this.$parent.actionType,
      itemNameRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.name : '',
      itemCategoryRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.category : '',
      itemDescRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.description : '',
      //itemImgRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.imageUrl : '',
      itemId: this.$attrs.selectedItem ? this.$attrs.selectedItem.id : '',
      nameRules: [
        v => !!v || 'Item Name is required',
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      categoryRules: [
        v => !!v || 'Item category is required',
      // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      itemCategoryList: this.buildItemCategoryList(),
      itemImageList: this.getImageList(this.$attrs.selectedItem.id),
      newImageList: [],
    }
  },
  methods: {
    itemFormSubmit() {
      let item = {
        "name": this.itemNameRef,
        "category": this.itemCategoryRef,
        "description": this.itemDescRef,
        "id": this.itemId,
        //"img_url": this.itemImgRef
      }
      this.$parent.handleItemSubmit(item);

      if (this.newImageList.length > 0) {
        this.$parent.handleImageLinks(this.newImageList, this.itemId);
      }
    },
    
    cancel() {
      this.$parent.toggleItem();
    },

    getImageList(itemId) {
      ImageService.getImageList(this.$store.userToken, itemId)
      .then(response => {
        const headers = response.headers;
        response.json()
        .then(json => {
          if (response.ok) {          
            //this.toggleListView(roleType, json);
            this.itemImageList = json;
          } else {
            var error = headers.get('TokenError');
            console.log(error);
            //this.getParent().handleResponseError(error, 'getPersonList');
          }  
        })
      })
      .catch(() => console.log('Image Service failed'));
    },

    buildItemCategoryList() {
      let itemCategoryList = CATEGORIES.map(function(itemCategory) {
        if (itemCategory.value === '') {
          return ''
        }
        return {text: itemCategory.label, value: itemCategory.value}
      });
      return itemCategoryList;
    }
  }
}
</script>
<style lang="scss">
  .image-window {
    height: 300px;
    width: 300px;
    margin: 5px 0 10px 10px;
  }

  .upload-window {
    margin-top: -350px;
    margin-right: -200px;
  }
</style>