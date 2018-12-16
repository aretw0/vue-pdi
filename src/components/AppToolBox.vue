<template>
  <!-- <v-container>
    <canvas></canvas>
  </v-container> -->
   <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
        </p>
      </v-flex>

    </v-layout>
    <v-snackbar
        v-model="snackbar.show"
        :multi-line="true"
        :right="true"
        :timeout="3000"
        :top="true"
      >
        {{ snackbar.text }}
        <v-btn
          color="blue"
          flat
          @click="snackbar.show = false"
        >
          Fechar
        </v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
/* eslint-disable */
  export default {
    name: "app-toolbox",
    data: () => ({
      imageLoad: {
        load: false
      },
      primaryImg: {
        selected: false
      },
      secondaryImg: {
        selected: false
      },
      canvasPics: [],
      snackbar: {
        show: false,
        text: ''
      }
    }),
    created () {
      window.getApp.$on('APP_TB', (op) => {
        console.log("APP_TB: ",op);
      });
      window.getApp.$on('APP_UPLOAD', (img) => {
        console.log("APP_UPLOAD");
         const reader = new FileReader();
         var vm = this;
          reader.onload = function(e) {
            vm.imageLoad.load = true;
            vm.imageLoad.img = e.target.result;       
            vm.snackbar.text = "Imagem carregada!";
            vm.snackbar.show = true;
            console.log("Image carregada", e.target.result);
          };
          reader.readAsDataURL(img);
      });
    }
  }
</script>

<style>

</style>