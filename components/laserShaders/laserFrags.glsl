
    uniform float utime;
    uniform vec3 ulin;
    varying vec2 vUv;

      void main() {
        float visible = 1.0;
        float streght = mod((utime/5.0)-(vUv.y*1.0),0.5);
        streght = step(0.1,streght);
     

        vec3 mixCol = mix(vec3(1.0,1.0,1.0),vec3(1.0,0.0,0.0),streght);
        gl_FragColor = vec4(mixCol,visible);


        
      }
