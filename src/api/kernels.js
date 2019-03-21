// Define several convolution kernels
const Kernels = {
   normal: [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0,
   ],
// realce
   inverse: [
      0, 0, 0,
      0, -1, 0,
      0, 0, 0
   ],
// filtragem
   // passa-baixa
   media3: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1
   ],
   media5: [
      1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
      1, 1, 1, 1, 1
   ],
   mediana3: [],
   mediana5: [],
   max: [],
   min: [],
   mode: [],
      //preservar bordas
   kawa: [], // Kawahara
   nagmat: [], // Nagao e Matsuyama
   sombo: [], // Somboonkaew

   // passa-alta
   h1: [
       0, -1,  0
      -1,  4, -1,
       0, -1,  0    
   ],
   h2: [
      -1, -1, -1,
      -1,  8, -1,
      -1, -1, -1
   ],
   m1: [
      -1, -1, -1,
      -1,  9, -1,
      -1, -1, -1
   ],
   m2: [
       1, -2,  1
      -2,  5, -2,
       1, -2,  1 
   ],
   m3: [
       0, -1,  0
      -1,  5, -1,
       0, -1,  0 
   ],
   // perguntar depois
   highbt(A) {
      return [
      -1, -1, -1
      -1, (9*A-1), -1
      -1, -1, -1
   ]}, // high-boost

   // halftoning (meio tom)
      // pontilhado ordenado
   po2x2: [
      0, 2, 0,
      3, 1, 0,
      0, 0, 0
   ],
   po2x3: [
      3, 0, 4,
      5, 2, 1,
      0, 0, 0,
   ],
   po3x3: [
      6, 8, 4,
      1, 0, 3,
      5, 2, 7
   ],
      // pontilhado difuso
   floste: [], // Floyd e Steinberg
   jarjunin: [], // Jarvis, Judice & Ninke
   stucki: [], // Stucki
   stevarc: [], // Stevenson e Arce
// segmentação
   dots: [
      -1, -1, -1,
      -1,  8, -1,
      -1, -1, -1
   ], // pontos
   // Retas
   horiz: [
      -1, -1, -1,
       2,  2,  2,
      -1, -1, -1
   ],
   vert: [
      -1,  2, -1,
      -1,  2, -1,
      -1,  2, -1
   ],
   a45: [
      -1, -1,  2,
      -1,  2, -1,
       2, -1, -1
   ],
   a135: [
       2, -1, -1,
      -1,  2, -1,
      -1, -1,  2
   ],

   // Detecção de Bordas
   robts() {
      return [[
         1, 0, 0,
         -1, 0, 0,
         0, 0, 0 
      ],
      [
         1, -1, 0,
         0, 0, 0,
         0, 0, 0
      ]];
   }, // roberts
   crossrobts() {
      return [[
         1, 0, 0,
         0, -1, 0,
         0, 0, 0
      ],
      [
         0, 1, 0,
         -1, 0, 0,
         0, 0, 0
      ]];
   }, // cross roberts
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
   kirsch(){
      return [
         [
            5, -3, -3,
            5,  0, -3,
            5, -3, -3
         ],
         [
            -3, -3, -3,
             5,  0, -3,
             5,  5, -3
         ],
         [
            -3, -3, -3,
            -3,  0, -3,
             5,  5,  5
         ],
         [
            -3, -3, -3,
            -3,  0,  5,
            -3,  5,  5
         ],
         [
            -3, -3,  5,
            -3,  0,  5,
            -3, -3,  5
         ],
         [
            -3,  5,  5,
            -3,  0,  5,
            -3, -3, -3
         ],
         [
             5,  5,  5,
            -3,  0, -3,
            -3, -3, -3
         ],
         [
             5,  5, -3,
             5,  0, -3,
            -3, -3, -3
         ]
      ];
   }, // kirsch
   robin(){
      return [
         [
            1, 0, -1,
            2, 0, -2,
            1, 0, -1
         ],
         [
            0, -1, -2,
            1,  0, -1,
            2,  1,  0
         ],
         [
            -1, 2, -1,
            0,  0,  0,
            1,  2,  1
         ],
         [
            -2, -1, 0,
            -1,  0, 1,
             0,  1, 2
         ],
         [
            -1,  0,  1,
            -2,  0,  2,
            -1,  0,  1
         ],
         [
             0,  1,  2,
            -1,  0,  1,
            -2, -1,  0
         ],
         [
             1,  2,  1,
             0,  0,  0,
            -1,  2, -1
         ],
         [
            2,  1,  0,
            1,  0, -1,
            0, -1, -2
         ]
      ];
   }, // robinson
   freche() {
      let raiz2 = Math.sqrt(2);
      return [
         [
            1, raiz2, 1,
            0,    0, 0,
            -1, -raiz2, -1
         ],
         [
            1, 0, -1,
            raiz2, 0, -raiz2,
            1, 0, -1
         ],
         [
            0, -1, raiz2,
            1,  0, -1,
            -raiz2, 1, 0
         ],
         [
         raiz2, -1, 0
            -1, 0, 1,
            -1, 1, -raiz2
         ]
      ];
   }, // Frey-Chen
   //laplaciano
   laplah1: [
      0, -1, 0,
      -1, 4, -1,
      0, -1, 0
   ],
   laplah2: [
      -1, -4, -1,
      -4, 20, -4,
      -1, -4, -1
   ]


   // segmentação

};

export default Kernels;