<template>
 <v-layout>
    <v-flex>
      <v-card id="wb">
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
          <v-switch flat color="dark"
          :label="`${normalize ? 'Normalizar' : 'Truncar'}`"
          v-model="normalize"></v-switch>
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
              <v-card flat id="area" xs8>
                <div id="reflex" :style="styleReflex">
                  <canvas id="trans" :style="styleTrans"></canvas>
                </div>
              </v-card>
              <v-card flat color="dark" xs4 id="transCtrls">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Rotação</v-subheader>
                        <v-slider
                          v-model="transOp.r"
                          :max="transOp.rTotal"
                          :min="-transOp.rTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Tranlação X</v-subheader>
                        <v-slider
                          v-model="transOp.tX"
                          :max="transOp.tTotal"
                          :min="-transOp.tTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Tranlação Y</v-subheader>
                        <v-slider
                          v-model="transOp.tY"
                          :max="transOp.tTotal"
                          :min="-transOp.tTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Escala X</v-subheader>
                        <v-slider
                          v-model="transOp.sX"
                          step=".1"
                          :max="transOp.sTotal"
                          :min="-transOp.sTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Escala Y</v-subheader>
                        <v-slider
                          v-model="transOp.sY"
                          step=".1"
                          :max="transOp.sTotal"
                          :min="-transOp.sTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Cisalhamento X</v-subheader>
                        <v-slider
                          v-model="transOp.cX"
                          :max="transOp.cTotal"
                          :min="-transOp.cTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Cisalhamento Y</v-subheader>
                        <v-slider
                          v-model="transOp.cY"
                          :max="transOp.cTotal"
                          :min="-transOp.cTotal"
                          thumb-label="always"
                        ></v-slider>
                      </v-flex>
                      <v-flex xs12>
                        <v-subheader class="pl-0">Reflexão</v-subheader>
                        <v-btn flat color="black" @click="transOp.rX = !transOp.rX">Reflexão X</v-btn>
                        <v-btn flat color="black" @click="transOp.rY = !transOp.rY">Reflexão Y</v-btn>
                        <v-subheader class="pl-0">Resetar Valores</v-subheader>
                      </v-flex>
                      <v-flex xs12>       
                        <v-btn flat color="black" @click="resetTransf()">Resetar Valores</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
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
        :color="snackbar.color">
        {{ snackbar.text }}
        <v-btn
          color="white"
          flat
          @click="snackbar.show = false">
          Fechar
        </v-btn>
      </v-snackbar>
      <v-dialog
        v-model="menu"
        persistent
        attach="#wb"
        max-width="500"
      >
  
        <v-card>
          <v-list>
            <v-list-tile>
  
              <v-list-tile-content>
                <v-list-tile-title>Informe parâmetro</v-list-tile-title>
              </v-list-tile-content>
  
              <v-list-tile-action>
                <v-btn
                  icon
                  @click="menu = false"
                >
                  <v-icon>close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list>
            <v-list-tile>
              <v-list-tile-action>
                 <v-layout
                  v-if="gapContrast"
                  justify-space-between
                  row fill-height
                >
                  <v-flex
                    shrink
                    style="width: 60px"
                  >
                    <v-text-field
                      v-model="gap[0]"
                      class="mt-0"
                      hide-details
                      single-line
                      type="number"
                    ></v-text-field>
                  </v-flex>
            
                  <v-flex xs8>
                    <v-range-slider
                      v-model="gap"
                      :max="1"
                      :min="0"
                      :step="0.1"
                    ></v-range-slider>
                  </v-flex>
                  <v-flex
                    shrink
                    style="width: 60px"
                  >
                    <v-text-field
                      v-model="gap[1]"
                      class="mt-0"
                      hide-details
                      single-line
                      type="number"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  v-else
                  justify-center row wrap
                >
                  <v-flex>
                    <v-slider
                          v-model="valueParam"
                          thumb-label="always"
                          :max="1"
                          :min="0"
                          :step="0.1"
                    ></v-slider>
                  </v-flex>
                </v-layout>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn flat @click="menu = false">Cancelar</v-btn>
            <v-btn color="primary" flat @click="doneArgs()">Pronto</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import Utils from '@/api/utils';
/* eslint-disable */
  export default {
    name: "app-toolbox",
    data: () => ({
      menu: false,
      valueParam: 1,
      gap: [0,1],
      operation: '',
      dialog: false,
      transOp:{
        rTotal: 360,
        r: 0,
        tTotal: 250,
        tY: 0,
        tX: 0,
        sTotal: 3,
        sY: 1,
        sX: 1,
        cTotal: 50,
        cX: 0,
        cY: 0,
        rY: false,
        rX: false
      },
      transArea: {},
      cvArea: {},
      area: {},
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
      normalize: false,
      snackbar: {
        show: false,
        text: '',
        color: 'success'
      },
      imgSrc: null
    }),
    created () {
      window.getApp.$on('APP_TB', (op) => {
        console.log(op);
        this.operation = op;
        switch (op) {
          case 'gap':
          case 'highbt':
          case 'dots':
          this.menu = true;
          break;
          default:
            Utils.menuOp(this);
          break;
        }
      });
      window.getApp.$on('APP_UPLOAD', (image) => {
        // console.log(image);
        Utils.imageUpload(image, this);
      });
    },
    mounted () {
      this.cvArea = document.getElementById("cvArea");
      this.transArea = document.getElementById("trans");
      this.area = document.getElementById("area");
      // console.log(this.transArea);
    },
    methods: {
      doneArgs() {
        this.menu = false;
        Utils.menuOp(this);
      },
      pushMessage (msg,type) {
        this.snackbar.show = false; 
        this.snackbar.text = msg;
        this.snackbar.color = type;
        this.snackbar.show = true;
      },
      pushCanvas (canvas) {
        // a forma de por
        this.cvArea.children[0].appendChild(canvas);
        this.cvs++;
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
        
        let gl = ev.target.getContext('webgl2');
        let img = new Uint8Array(4);
        gl.readPixels(this.info.x,this.info.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, img);
        // console.log(pixels);
        this.info.r = img[0];
        this.info.g = img[1];
        this.info.b = img[2];
        this.info.a = img[3];
        this.info.bgc = "background-color: rgb("+this.info.r+","+this.info.g+","+this.info.b+");"
      },
      dblclickEv (ev) {
        // console.log(ev);
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
            this.pushMessage("Opção secundária selecionada!","red");
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
            this.pushMessage("Opção primária selecionada!","blue");
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
         this.pushMessage("Opções resetadas","black");
        }
      },
      eraseAll () {
        this.resetCtrl(false);
        while (this.cvArea.children[0].hasChildNodes()) {
          // a forma de tirar
            this.cvArea.children[0].removeChild(this.cvArea.children[0].lastChild);
        }
        this.cvs = 0;
        this.pushMessage("Área de trabalho limpa!","black");
      },
      callDialog () {
        console.log("Chamando Dialog");
        this.dialog = true;
        var vm = this;
        var area = this.area;

        setTimeout (function() {
          console.log("1,5 segundos depois");
         area.style.padding = (Math.abs((area.clientHeight/2)-vm.primaryImg.el.height)) + "px 0px";
          Utils.drawImageDialog(vm.transArea,vm.primaryImg.el);

        },1500);

      },
      closeDialog () {
        console.log("Fechando Dialog");
        Utils.clearCanvas(this.transArea);
       
        this.dialog = false;
      },
      resetTransf () {
         this.transOp.r = 0;
         this.transOp.tY = 0;
         this.transOp.tX = 0;
         this.transOp.sY = 1;
         this.transOp.sX = 1;
         this.transOp.cX = 0;
         this.transOp.cY = 0;
         this.transOp.rX = false;
         this.transOp.rY = false;
      }
    },
    computed: {
      styleReflex() {

        let translate = 'translate(';
        let scale = 'scale('

        translate += (this.transOp.rY ? -300 : 0) +  'px,';

        translate += (this.transOp.rX ? 300 : 0) + 'px)';

        scale += (this.transOp.rY ? -1 : 1) + ',';
        scale += (this.transOp.rX ? -1 : 1) + ')';

        return {
          transform: translate + ' ' + scale
        }
      },
      styleTrans() {
        console.log("Computed Style")
        let rotate = 'rotate(' + this.transOp.r + 'deg)';
        let translate = 'translate(' + this.transOp.tX + 'px,'+this.transOp.tY+'px)';
        let scale = 'scale(' + this.transOp.sX + ',' + this.transOp.sY + ')';
        let skew = 'skew(' + this.transOp.cX + 'deg,' + this.transOp.cY +'deg)';
        return { transform:  rotate + ' ' +translate + ' ' + scale + ' ' + skew }
      },
      gapContrast() {
        return this.operation === 'gap';
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
    margin: auto;
    display: block;
  }
  #transArea {
    width: 100%;
    height: 90%;
    position: absolute;
    z-index: 98;
    overflow: auto;
  }
  #transCtrls {
    overflow-y: auto;
    /* position: absolute; */
    width: 300px;
    z-index: 99;
    background-color: transparent;
  }
  #wbTrans {
    height: 630px;
  }
  #wb {
    background-color: dimgray;
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