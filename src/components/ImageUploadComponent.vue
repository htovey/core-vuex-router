<template>
    <v-container class="upload-window">
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>
   
    <v-layout row>
      <v-flex  md6 offset-sm3 >
       <div>
         <div >
           <input type="file" ref="input1"
            style="display: none"
            @change="uploadImage" accept="image/*" >                
         </div>
 
       <div v-if="displayImage">                     
          <img class="preview" height="268" width="356" :src="img1">
          <v-overlay :value="loading">
            <v-progress-circular
              indeterminate
              size="64"
            ></v-progress-circular>
          </v-overlay>
       <br>
       </div>   
      
       </div>
       </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="blue" @click="click1">{{displayImage ? "Save" : "Choose Image"}}</v-btn>
        <v-btn color="error" v-if="displayImage" @click="cancel">Cancel</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  </template>
<script>
import firebase from 'firebase/app';

export default {
    data () {
        return {
            loading: false,
            displayImage: false,
            imageData: {},
            imageDataUrl: '',
            img1: '',
            token: this.$store.getters.token,
            imageList: [],
            imageRecord: {},
        }
    }, 
    methods: {
        cancel() {
          this.displayImage = false;
          this.img1 = '';
          this.imageList = [];
          this.imageData = {};
        },
        saveImage() {
          this.imageData = {};
          this.img1 = '',
          this.displayImage = false;
          this.$attrs.newImageList.push(this.imageRecord);
        },
        onUpload(){
          this.img1=null;
          this.loading = true;
          const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
          storageRef.on(`state_changed`, snapshot => {
              this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{
                  console.log(error.message)
                  this.loading = false;
                },
            ()=>{
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL()
              .then((url)=>{
                  this.img1 = url;
                  this.imageRecord = {
                    'viewId': this.$attrs.itemId,
                    'url': this.img1
                  };
                  this.handleUploadSuccess();
                });
              }      
            );
        },

        click1() {
          if (!this.displayImage) {
            this.$refs.input1.click();   
          } else {
            this.saveImage();
          }
        },

        uploadImage(event) {
          this.uploadValue=0;
          this.imageData = event.target.files[0];
          this.displayImage = true;
          this.onUpload()
        },  
        handleUploadSuccess() {
          this.displayImage = true;
          this.loading = false;
          console.log(this.img1);
        },
    }
}
</script>
<style lang="scss" scoped>
    .v-btn {
      margin-left: 10px;
    }
</style>