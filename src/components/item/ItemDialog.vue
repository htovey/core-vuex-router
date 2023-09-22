<template>
<div>
     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    class="item-form"
  >
    <v-text-field
      v-model="itemNameRef"
      ref="itemNameRef"
      :counter="10"
      :rules="nameRules"
      label="Item Name"
      outlined
      required
    ></v-text-field>

    <v-select 
      v-model="itemCategoryRef"
      ref="itemCategoryRef"
      label="Category"
      outlined
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
      outlined
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
  <image-panel :imageList="itemImageList" :newImageList="newImageList"></image-panel>
  <image-upload :itemId="itemId" :newImageList="newImageList"></image-upload>
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
      token: this.$store.getters.token,
      //item: this.$attrs.selectedItem,
      actionType: this.$parent.actionType,
      itemNameRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.name : '',
      itemCategoryRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.category : '',
      itemDescRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.description : '',
      itemImgRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.imageUrl : '',
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
      itemImageList: [],
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
        "img_url": this.getImageUrl(),
      }
      this.$attrs.handleItemSubmit(item, this.newImageList)   
    },

    getImageUrl() {
      let url = null;
      if (this.itemImageList.length > 0) {
        url = this.itemImageList[0].url;
      } else if (this.newImageList.length > 0) {
        url = this.newImageList[0].url;
      }
      return url;
    },

    cancel() {
      this.$parent.toggleItem();
    },

    getImageList(itemId) {
      ImageService.getImageList(this.token, itemId)
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
  },
  created() {
    this.itemImageList = this.getImageList(this.$attrs.selectedItem.id);
  },
}
</script>
<style lang="scss">
  .v-form {
    width: 50%;
    margin: 50px 10px 0 15px;
    border: 1px gray solid;
    height: 600px;

    .v-input {
      width: 90%;
      border: 1px lightblue solid;
    }
  }

  .image-window {
    height: 300px;
    width: 300px;
    margin: 5px 0 10px 10px;
  }

  .upload-window {
    margin-top: -350px;
    margin-right: 0px;
    width: 45%
  }
</style>