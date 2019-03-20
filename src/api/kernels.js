import { ok } from "assert";

// Define several convolution kernels
const Kernels = {
   normal: [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0,
   ],
// filtragem
   // passa-baixa
   media3: [],
   media5: [],
   max: [],
   min: [],
   mode: [],
      //preservar bordas
   kawa: [], // Kawahara
   nagmat: [], // Nagao e Matsuyama
   sombo: [], // Somboonkaew

   // passa-alta
   h1: [],
   h2: [],
   m1: [],
   m2: [],
   m3: [],
   highbt: [], // high-boost

   // halftoning (meio tom)
      // pontilhado ordenado
   po2x2: [],
   po2x3: [],
   po3x3: [],
      // pontilhado difuso
   floste: [], // Floyd e Steinberg
   jarjunin: [], // Jarvis, Judice & Ninke
   stucki: [], // Stucki
   stevarc: [], // Stevenson e Arce
// segmentação
   dots(t) { return [t] }, // pontos
   // Retas
   horiz: [],
   h2: [],
   a45: [],
   a135: [],
   m3: [],

   // Bordas
   robts: [], // roberts
   crossrobts: [], // cross roberts
   // SOBEL
   sobelgy: [
      1,  2,  1,
      0,  0,  0,
      -1, -2, -1,
   ],
   sobelgx: [
      1,  0, -1,
      2,  0, -2,
      1,  0, -1,
   ],
   sobelmag() { return [this.sobelgx, this.sobelgy]; },
   // PREWIIT
   prewgy: [
      1,  1,  1,
      0,  0,  0,
      -1, -1, -1,
   ],
   prewgx: [
      1,  0, -1,
      1,  0, -1,
      1,  0, -1,
   ],
   prewmag() { return [this.prewgx, this.prewgy]; },
   krish: [], // krish
   robin: [], // robinson
   freche: [], // Frey-Chen
   //laplaciano
   lablah1: [],
   lablah2: [],


   // segmentação

   gaussianBlur: [
      0.045, 0.122, 0.045,
      0.122, 0.332, 0.122,
      0.045, 0.122, 0.045,
   ],
   gaussianBlur2: [
      1, 2, 1,
      2, 4, 2,
      1, 2, 1,
   ],
   gaussianBlur3: [
      0, 1, 0,
      1, 1, 1,
      0, 1, 0,
   ],
   unsharpen: [
      -1, -1, -1,
      -1,  9, -1,
      -1, -1, -1,
   ],
   sharpness: [
       0, -1,  0,
      -1,  5, -1,
       0, -1,  0,
   ],
   sharpen: [
       -1, -1, -1,
       -1, 16, -1,
       -1, -1, -1,
   ],
   edgeDetect: [
      -0.125, -0.125, -0.125,
      -0.125,  1,     -0.125,
      -0.125, -0.125, -0.125,
   ],
   edgeDetect2: [
      -1, -1, -1,
      -1,  8, -1,
      -1, -1, -1,
   ],
   edgeDetect3: [
      -5, 0, 0,
      0, 0, 0,
      0, 0, 5,
   ],
   edgeDetect4: [
      -1, -1, -1,
      0,  0,  0,
      1,  1,  1,
   ],
   edgeDetect5: [
      -1, -1, -1,
      2,  2,  2,
      -1, -1, -1,
   ],
   edgeDetect6: [
      -5, -5, -5,
      -5, 39, -5,
      -5, -5, -5,
   ],
   boxBlur: [
      0.111, 0.111, 0.111,
      0.111, 0.111, 0.111,
      0.111, 0.111, 0.111,
   ],
   triangleBlur: [
      0.0625, 0.125, 0.0625,
      0.125,  0.25,  0.125,
      0.0625, 0.125, 0.0625,
   ],
   emboss: [
      -2, -1,  0,
      -1,  1,  1,
      0,  1,  2,
   ]
};

export default Kernels;