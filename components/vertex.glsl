varying vec2 vUv;
attribute float customUV; 
varying vec2 vcustomUV;
  // uniform float utime;
      void main() { 
        vUv = uv;
        vcustomUV = uv;
        vec4 modelPosition = modelViewMatrix * vec4(position.x,position.y,position.z, 1.0);
        gl_Position = projectionMatrix * modelPosition;
      }
