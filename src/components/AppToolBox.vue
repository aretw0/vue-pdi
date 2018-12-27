<template>
 <v-layout>
    <v-flex>
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Canvas</h3>
          </div>
        </v-card-title>
        <v-responsive id="cvArea">

        </v-responsive>
        <v-card-text v-if="cvs > 0" style="text-align: right;">
          X: {{info.x}} / Y: {{info.y}} - RGBA({{info.r}},{{info.g}},{{info.b}},{{info.a}}) <span :style="info.bgc">C</span>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="orange" @click="resetCtrl()">Resetar controles</v-btn>
          <v-btn flat color="red" @click="eraseAll()">Apagar tudo</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-snackbar
        v-model="snackbar.show"
        :multi-line="true"
        :right="true"
        :timeout="1800"
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
      <img @load="imageLoaded($event)" id="imgLoad" alt="Upload" style="display: none;"/>
  </v-layout>
</template>

<script>
import cv from "openCV";
import ImageP from '@/api/imageP';
import Utils from '@/api/utils';
/* eslint-disable */
  export default {
    name: "app-toolbox",
    data: () => ({
      cvArea: {},
      cvs: 0,
      info: {
        x: 0,
        y: 0,
        r: 0,
        g: 0,
        b: 0,
        a: 0,
        bgc: "dysplay: none;"
      },
      lastSelected: 0,
      primaryImg: {
        selected: false
      },
      secondaryImg: {
        selected: false
      },
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
      window.getApp.$on('APP_UPLOAD', (image) => {
        // console.log(image);
        const reader = new FileReader();
         var vm = this;
          reader.onload = function(e) {
            let img = new ImageP(window.atob(e.target.result.split(',')[1]));;
            if (!img.notP) {
              let index = vm.cvs.length
              let canvas = Utils.createCanvas([vm.moveEv,vm.clickEv,vm.dblclickEv]);
              let ctx = canvas.getContext('2d');

              img.data = img._formatter.getImageData(img._parser,ctx);

              canvas.width = ctx.width = img.width;
              canvas.height = ctx.height = img.height;

              ctx.putImageData(img.data,0,0);

              // a forma de por
              vm.cvArea.children[0].appendChild(canvas);
              vm.cvs++;

              vm.snackbar.text = "Imagem carregada!";
              vm.snackbar.show = true;

            } else {
              document.getElementById("imgLoad").src = URL.createObjectURL(image);
            }
          };
          reader.readAsDataURL(image);
      });
    },
    mounted () {
      this.cvArea = document.getElementById("cvArea");
      // console.log(this.cvArea);
    },
    methods: {
      imageLoaded (e) {
        // console.log("Image carregada", e.target.result);
        let mat = cv.imread(e.target);
        let canvas = Utils.createCanvas([this.moveEv,this.clickEv,this.dblclickEv]);
        cv.imshow(canvas, mat);
        mat.delete();

        // a forma de por
        this.cvArea.children[0].appendChild(canvas);
        this.cvs++;
        this.snackbar.text = "Imagem carregada!";
        this.snackbar.show = true;
      },
      moveEv (ev) {
        // console.log(ev);
        let position;
        let current_left = 0, current_top = 0;
        let obj = ev.target;
        if (obj.offsetParent){
            do{
                current_left += obj.offsetLeft;
                current_top += obj.offsetTop;
            }while(obj = obj.offsetParent);
            position = {x: current_left, y: current_top};
        }
        this.info.x = ev.pageX - position.x;
        this.info.y = ev.pageY - position.y;
        let img =  ev.target.getContext('2d').getImageData(this.info.x,this.info.y,1,1);
        this.info.r = img.data[0];
        this.info.g = img.data[1];
        this.info.b = img.data[2];
        this.info.a = img.data[3];
        this.info.bgc = "background-color: rgb("+this.info.r+","+this.info.g+","+this.info.b+");"
      },
      dblclickEv (ev) {
        console.log(ev);
        switch(this.lastSelected) {
          case 1:
            // lembrar de retirar estilos de quem deixou de ser
            this.secondaryImg.el = ev.target;
            this.secondaryImg.selected = true;
            this.lastSelected = 0;
          break;
          default:
           // lembrar de retirar estilos de quem deixou de ser
            this.primaryImg.el = ev.target;
            this.primaryImg.selected = true;
            this.lastSelected = 1;
          break;
        }
      },
      clickEv (ev) {
        if (ev.ctrlKey) {
          // a forma de tirar
          this.cvArea.children[0].removeChild(ev.target);
          --this.cvs;
        }
      },
      resetCtrl () {
        console.log("resetCtrl");
      },
      eraseAll () {
        while (this.cvArea.children[0].hasChildNodes()) {
          // a forma de tirar
            this.cvArea.children[0].removeChild(this.cvArea.children[0].lastChild);
        }
        this.cvs = 0;
      }
    }
  }
</script>

<style>
  canvas {
    margin: 10px;
  }
</style>