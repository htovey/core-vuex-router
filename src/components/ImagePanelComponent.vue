<template>
    <div>
            <v-container fluid>
      <v-row dense>
        <v-col
          v-for="img in this.$attrs.imageList"
          :key="img.id"
          :cols="img.flex"
        >
          <v-card width="fit-content">
            <v-img
              :src="img.url"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              width="200px"
            >
              
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </div>
</template>
