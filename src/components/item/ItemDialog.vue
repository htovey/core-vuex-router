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
  
  <v-container>
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>

   
    <v-layout row>
      <v-flex  md6 offset-sm3 >
       <div>
         <div >
           <v-btn @click="click1">choose photo</v-btn>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/*" >                
         </div>
 
       <div v-if="imageData!=null">                     
          <img class="preview" height="268" width="356" :src="img1">
       <br>
       </div>   
      
       </div>
       </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex md6 offset-sm3 class="text-center">
        <v-text-field
        solo
        v-model="caption"
        label="Caption goes here">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="pink" @click="upload">upload</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import { CATEGORIES } from '../../constants/ItemCategories';
//import {db} from '../../includes/firebase';
import firebase from 'firebase/app';

export default {
    data() {
      return {
        caption: '',
        imageData: {},
        img1: {},
        valid: true,
        //item: this.$attrs.selectedItem,
        actionType: this.$parent.actionType,
        itemNameRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.name : '',
        itemCategoryRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.category : '',
        itemDescRef: this.$attrs.selectedItem ? this.$attrs.selectedItem.description : '',
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
        
        upload() {
          const post = {
            photo: this.img1,
            caption: this.caption        
          }
          firebase.database().ref('photos').push(post)
          .then((response) => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
        },
        onUpload(){
          this.img1=null;
          const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
          storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
          ()=>{this.uploadValue=100;
              storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                  this.img1 =url;
                  console.log(this.img1)
                });
              }      
            );
        },

        click1() {
          this.$refs.input1.click()   
        },

        previewImage(event) {
          this.uploadValue=0;
          this.img1=null;
          this.imageData = event.target.files[0];
          this.onUpload()
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