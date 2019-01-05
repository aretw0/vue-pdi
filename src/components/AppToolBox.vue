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
          <v-btn flat color="orange" @click="resetCtrl(true)">Resetar controles</v-btn>
          <v-btn flat color="red" @click="eraseAll()">Apagar tudo</v-btn>
          <v-btn flat v-if="primaryImg.selected" color="dark" @click="callDialog()">Transformadas</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card width="100%" height="100%">
          <v-toolbar dark>
            <v-btn icon dark @click="closeDialog()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Transformadas</v-toolbar-title>
          </v-toolbar>
            <v-layout justify-end fill-height id="wbTrans">
              <v-card flat id="transArea">
                <canvas id="trans"></canvas>
              </v-card>
                <v-card flat color="dark">
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field label="Email*" required></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                </v-card>
            </v-layout>
        </v-card>
      </v-dialog>
    <v-snackbar
        v-model="snackbar.show"
        :multi-line="true"
        :timeout="1750"
        :top="true"
        :color="snackbar.color"
      >
        {{ snackbar.text }}
        <v-btn
          color="white"
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
      transArea: {},
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
      dialog: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
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
              vm.snackbar.show = false; 
              vm.snackbar.text = "Imagem carregada!";
              vm.snackbar.color = "success";
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
      this.transArea = document.getElementById("trans");

      // console.log(this.transArea);
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
        this.snackbar.show = false; 
        this.snackbar.text = "Imagem carregada!";
        this.snackbar.color = "success";
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
            if (this.secondaryImg.selected) {
              // se ja foi selecionado
              // this.secondaryImg.el
              this.secondaryImg.el.classList.remove("c2");
            }
            ev.target.classList.add("c2");
            this.secondaryImg.el = ev.target;
            this.secondaryImg.selected = true;
            this.lastSelected = 0;
            this.snackbar.text = "Opção secundária selecionada!";
            this.snackbar.color = "red";
            this.snackbar.show = true;
          break;
          default:
           // lembrar de retirar estilos de quem deixou de ser
           if (this.primaryImg.selected) {
              // se ja foi selecionado
              this.primaryImg.el.classList.remove("c1");
            }
            ev.target.classList.add("c1");
            this.primaryImg.el = ev.target;
            this.primaryImg.selected = true;
            this.lastSelected = 1;
            this.snackbar.show = false; 
            this.snackbar.text = "Opção primária selecionada!";
            this.snackbar.color = "blue";
            this.snackbar.show = true;
          break;
        }
      },
      clickEv (ev) {
        if (ev.ctrlKey) {
          // a forma de tirar
          if (this.secondaryImg.selected) {
            if (ev.target == this.secondaryImg.el) {
              console.log("Igual a secundário!");
              delete this.secondaryImg.el
              this.secondaryImg.selected = false;
              this.lastSelected =  1;
            }
          }

          if (this.primaryImg.selected) {
            if (ev.target == this.primaryImg.el) {
              console.log("Igual a primário!")
              delete this.primaryImg.el
              this.primaryImg.selected = false;
              this.lastSelected = 0;
            }
          }
          this.cvArea.children[0].removeChild(ev.target);
          --this.cvs;
        }
      },
      resetCtrl (info) {
        console.log("resetCtrl");
        if (this.primaryImg.selected) {
          this.primaryImg.el.classList.remove("c1");
          delete this.primaryImg.el;
          this.primaryImg.selected = false;
        }
        if (this.secondaryImg.selected) {
          this.secondaryImg.el.classList.remove("c2");
          delete this.secondaryImg.el;
          this.secondaryImg.selected = false;
        }
        this.lastSelected = 0;
        if (info) {
          this.snackbar.show = false; 
          this.snackbar.text = "Opções resetadas";
          this.snackbar.color = "black";
          this.snackbar.show = true; 
        }
      },
      eraseAll () {
        this.resetCtrl(false);
        while (this.cvArea.children[0].hasChildNodes()) {
          // a forma de tirar
            this.cvArea.children[0].removeChild(this.cvArea.children[0].lastChild);
        }
        this.cvs = 0;
        this.snackbar.show = false; 
        this.snackbar.text = "Área de trabalho limpa!";
        this.snackbar.color = "black";
        this.snackbar.show = true; 
      },
      callDialog () {
        console.log("Chamando Dialog");
        this.dialog = true;
        var vm = this;

        setTimeout (function() {
          console.log("1,5 segundos depois");
          let ctx = vm.transArea.getContext('2d');

          vm.transArea.width = ctx.width = vm.transArea.offsetWidth;
          vm.transArea.height = ctx.height = vm.transArea.offsetHeight;

          // console.log(vm.transArea.offsetWidth,vm.transArea.offsetHeight);
          // console.log(vm.transArea.width,vm.transArea.height);
          // console.log(ctx.width,ctx.height);

          ctx.drawImage( vm.primaryImg.el, (ctx.width-vm.primaryImg.el.width)/2, (ctx.height-vm.primaryImg.el.height)/2);
        },1500);

      },
      closeDialog () {
        console.log("Fechando Dialog");

        let context = this.transArea.getContext('2d'); 

        // Store the current transformation matrix
        // context.save();

        // Use the identity matrix while clearing the canvas
        // context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.transArea.width, this.transArea.height);

        // Restore the transform
        // context.restore();

        this.dialog = false;
      }
    }
  }
</script>

<style>
  canvas {
    margin: 10px;
    border: solid white;
  }
  #trans {
    display: block;
    margin: 0px;
    border: 0px;
    width: 100%;
    height: 100%;
  }
  #transArea {
    width: 100%;
    height: 100%;
  }
  #wbTrans {
    height: 630px;
  }
  .c1 {
    /*border: solid blue; */
    border-left: solid blue !important;
    border-top: solid blue !important;
    border-bottom: solid blue;
    border-right: solid blue;
  }
  .c2 {
    /*border: solid red;*/
    border-left: solid red;
    border-top: solid red;
    border-bottom: solid red !important;
    border-right: solid red !important;
  }
</style>