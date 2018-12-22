<template>
 <v-layout>
    <v-flex>
      <v-card>
        <canvas id="workbench"></canvas>
    

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Canvas</h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange">Resetar controles</v-btn>
          <v-btn flat color="red">Apagar tudo</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
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
      <img id="imageSrc" :src="imgSrc" @onload="imageLoaded($event.target)" alt="No Image"/>
  </v-layout>
</template>

<script>
import cv from "openCV";
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
      },
      imgSrc: null
    }),
    created () {
      console.log(cv ? 'OpenCV is available here!' : 'Uh oh..');
      window.getApp.$on('APP_TB', (op) => {
        console.log("APP_TB: ",op);
      });
      window.getApp.$on('APP_UPLOAD', (img) => {
        const reader = new FileReader();
         var vm = this;
          reader.onload = function(e) {
        console.log("ReaderOnLoad", e.target.result);
        console.log(window.atob(e.target.result.split(',')[1]));
            // vm.imageLoad.load = true;
            // vm.imageLoad.img = e.target.result;       
            // vm.imgSrc = e.target.result;
            
            // let mat = cv.imread(e.target.result);
            // cv.imshow('workbench', mat);

          };
          reader.readAsDataURL(img);
      });
    },
    methods: {
      imageLoaded (img) {
        console.log("Image carregada", img);
        // let mat = cv.imread(img);
        // cv.imshow('workbench', mat);
        mat.delete();
        this.snackbar.text = "Imagem carregada!";
        this.snackbar.show = true;
      }
    }
  }
</script>

<style>

</style>