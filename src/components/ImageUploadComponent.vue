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
      <v-flex class="text-center">
        <v-btn color="pink" @click="onUpload">upload</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  </template>
<script>
import firebase from 'firebase/app';

export default {
    data () {
        return {
            imageData: {},
            img1: {},
        }
    }, 
    methods: {
        onUpload(){
          this.img1=null;
          const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
          storageRef.on(`state_changed`, snapshot => {
              this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL()
              .then((url)=>{
                  this.img1 = url;
                 // this.itemImgRef = this.img1;
                 this.$attrs.newImageList.push(url);
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
         // this.onUpload()
        },  
    }
}
</script>