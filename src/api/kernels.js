// Define several convolution kernels
const Kernels = {
   normal: [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0,
   ],
   horiz: [],
   h2: [],
   a45: [],
   a135: [],
   m3: [],
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