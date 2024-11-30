
    uniform float utime;
    uniform vec3 uColor;
    uniform vec2 uline;
    uniform sampler2D utexture;
    varying vec2 vUv;

      void main() {

        float cols = vUv.x + sin( utime);
        vec4 texColor = texture2D(utexture, vUv);
        float strgt = 1.0;
        float strgt2 = distance(vUv,vec2(uline))*5.0;
        if(strgt2 > 0.5){strgt2 = 1.0;}
        else
        {
          strgt2 = strgt2/(vUv.x*0.5);
        }
        
        // vec4 mixedColor = mix(texColor,0.5,sin(utime));
        // float strgt = step(uline,vUv.x);

        // if(vUv.x >= (uline-0.05) && vUv.x <= (uline+0.05) )
        // {
        //     strgt = 0.0;
        // }

        gl_FragColor = vec4(texColor.x*strgt2,texColor.y*strgt2,texColor.z*strgt2,strgt);
        // gl_FragColor = vec4(cols,cols,cols,1.0);


        
      }
