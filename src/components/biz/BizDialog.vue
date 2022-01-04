<template>
     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    
  >
    <v-text-field
      v-model="bizNameRef"
      ref="bizNameRef"
      :counter="10"
      :rules="nameRules"
      label="Biz Name"
      required
    ></v-text-field>

    <v-select 
      v-model="bizTypeRef"
      ref="bizTypeRef"
      label="Type"
      required
      :items="bizTypeList"
      :rules="typeRules"  
    >
    </v-select>    

    <v-btn
      color="success"
      class="mr-4"
      @click="bizFormSubmit"
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
import { BIZTYPES } from '../../constants/BizTypes';

export default {
    data() {
      return {
        valid: true,
        actionType: this.$parent.actionType,
        nameRules: [
          v => !!v || 'Biz Name is required',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        bizNameRef: '',
        bizTypeRef: '',
        typeRules: [
          v => !!v || 'Biz type is required',
        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        bizTypeList: this.buildBizTypeList(),
      }
    },
    methods: {
        bizFormSubmit() {
          let biz = {
            "name": this.bizNameRef,
            "type": this.bizTypeRef,
            "id": this.bizid
          }
          this.$parent.handleBizSubmit(biz);
        },
        
        cancel() {
          this.$parent.toggleBiz();
        },

        buildBizTypeList() {
          let bizTypeList = BIZTYPES.map(function(bizType) {
            if (bizType.value === '') {
              // return <MenuItem classes={{"root": "disabledItem"}} disabled key={bizType.value} value={bizType.value}>{bizType.label}</MenuItem>
              return ''
            }
            // return <MenuItem key={bizType.value} value={bizType.value}>{bizType.label}</MenuItem>
            return {text: bizType.label, value: bizType.value}
          });
          return bizTypeList;
        }
    }
}
</script>