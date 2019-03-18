const Shaders = {
  vertexShader:
  `#version 300 es

  // an attribute is an input (in) to a vertex shader.
  // It will receive data from a buffer
  in vec2 a_position;
  in vec2 a_texCoord;
  
  // Used to pass in the resolution of the canvas
  uniform vec2 u_resolution;
  
  // Used to pass the texture coordinates to the fragment shader
  out vec2 v_texCoord;
  
  // all shaders have a main function
  void main() {
  
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
  
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
  
    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
  
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  
    // pass the texCoord to the fragment shader
    // The GPU will interpolate this value between points.
    v_texCoord = a_texCoord;
  }
  `,
  conv3Fragment:
  `#version 300 es
  
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default. It means "medium precision"
  precision mediump float;
  
  // our texture
  uniform sampler2D u_image;
  
  // the convolution kernal data
  uniform float u_kernel[9];
  uniform float u_kernelWeight;
  
  // the texCoords passed in from the vertex shader.
  in vec2 v_texCoord;
  
  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void main() {
    vec2 onePixel = vec2(1) / vec2(textureSize(u_image, 0));
  
    vec4 colorSum =
        texture(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[0] +
        texture(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[1] +
        texture(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[2] +
        texture(u_image, v_texCoord + onePixel * vec2(-1,  0)) * u_kernel[3] +
        texture(u_image, v_texCoord + onePixel * vec2( 0,  0)) * u_kernel[4] +
        texture(u_image, v_texCoord + onePixel * vec2( 1,  0)) * u_kernel[5] +
        texture(u_image, v_texCoord + onePixel * vec2(-1,  1)) * u_kernel[6] +
        texture(u_image, v_texCoord + onePixel * vec2( 0,  1)) * u_kernel[7] +
        texture(u_image, v_texCoord + onePixel * vec2( 1,  1)) * u_kernel[8] ;
      
    
    outColor = vec4((colorSum / u_kernelWeight).rgb, 1);
  }
  `,
  conv5: 
  `#version 300 es
  
  // fragment shaders don't have a default precision so we need
  // to pick one. mediump is a good default. It means "medium precision"
  precision mediump float;
  
  // our texture
  uniform sampler2D u_image;
  
  // the convolution kernal data
  uniform float u_kernel[9];
  uniform float u_kernelWeight;
  
  // the texCoords passed in from the vertex shader.
  in vec2 v_texCoord;
  
  // we need to declare an output for the fragment shader
  out vec4 outColor;

  void main() {
    vec2 onePixel = vec2(1) / vec2(textureSize(u_image, 0));
  
    vec4 colorSum =
        texture(u_image, v_texCoord + onePixel * vec2(-2, -2)) * u_kernel[0] +
        texture(u_image, v_texCoord + onePixel * vec2(-1, -2)) * u_kernel[1] +
        texture(u_image, v_texCoord + onePixel * vec2( 0, -2)) * u_kernel[2] +
        texture(u_image, v_texCoord + onePixel * vec2( 1, -2)) * u_kernel[3] +
        texture(u_image, v_texCoord + onePixel * vec2( 2, -2)) * u_kernel[4] +

        texture(u_image, v_texCoord + onePixel * vec2(-2, -1)) * u_kernel[5] +
        texture(u_image, v_texCoord + onePixel * vec2(-1, -1)) * u_kernel[6] +
        texture(u_image, v_texCoord + onePixel * vec2( 0, -1)) * u_kernel[7] +
        texture(u_image, v_texCoord + onePixel * vec2( 1, -1)) * u_kernel[8] +
        texture(u_image, v_texCoord + onePixel * vec2( 2, -1)) * u_kernel[9] +

        texture(u_image, v_texCoord + onePixel * vec2(-2, 0)) * u_kernel[10] +
        texture(u_image, v_texCoord + onePixel * vec2(-1, 0)) * u_kernel[11] +
        texture(u_image, v_texCoord + onePixel * vec2( 0, 0)) * u_kernel[12] +
        texture(u_image, v_texCoord + onePixel * vec2( 1, 0)) * u_kernel[13] +
        texture(u_image, v_texCoord + onePixel * vec2( 2, 0)) * u_kernel[14] +

        texture(u_image, v_texCoord + onePixel * vec2(-2, 1)) * u_kernel[15] +
        texture(u_image, v_texCoord + onePixel * vec2(-1, 1)) * u_kernel[16] +
        texture(u_image, v_texCoord + onePixel * vec2( 0, 1)) * u_kernel[17] +
        texture(u_image, v_texCoord + onePixel * vec2( 1, 1)) * u_kernel[18] +
        texture(u_image, v_texCoord + onePixel * vec2( 2, 1)) * u_kernel[19] +

        texture(u_image, v_texCoord + onePixel * vec2(-2, 2)) * u_kernel[20] +
        texture(u_image, v_texCoord + onePixel * vec2(-1, 2)) * u_kernel[21] +
        texture(u_image, v_texCoord + onePixel * vec2( 0, 2)) * u_kernel[22] +
        texture(u_image, v_texCoord + onePixel * vec2( 1, 2)) * u_kernel[23] +
        texture(u_image, v_texCoord + onePixel * vec2( 2, 2)) * u_kernel[24] ;       
    
    outColor = vec4((colorSum / u_kernelWeight).rgb, 1);
  }
  `
}

export default Shaders;