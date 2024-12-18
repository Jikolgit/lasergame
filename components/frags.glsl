
    uniform float utime;
    uniform vec3 uColor;
    uniform vec2 uline;
    uniform vec2 prevUline;
    uniform float cursorVisible;
    uniform float mx;
    uniform float my;
    uniform vec3 intersectPoint;
    uniform sampler2D utexture;
    varying vec2 vcustomUV;
    varying vec2 vUv;

      vec3 visor(vec3 args)
      {
        vec3 returnedValue = args;
        if(returnedValue.y > 0.15)
        {
          returnedValue = vec3(1.0);
        }
        else
        {
          if(returnedValue.y > 0.1 && returnedValue.y < 0.15 )
          {
            returnedValue = vec3(10.0,0.0,0.0);
          }
          else
          {
            returnedValue = vec3(1.0);
          }
          

        }

        return returnedValue;
      }
      void main() {
        float width = 0.1/7.0;
        float cols = vUv.x + sin( utime);
        vec4 texColor = texture2D(utexture, vUv);
        float strgt = 1.0;
        vec3 strgt2 = vec3(distance(vUv,vec2(uline))*5.0);
        strgt2 = visor(strgt2);

        // vec4 mixedColor = mix(texColor,texColorv2,0.5);
        vec4 mixedColor = texColor;
        // float strgt = step(uline,vUv.x);

        // if(vUv.y > (uline.y-width) && vUv.y < (uline.y+width) && vUv.x > (uline.x-width) && vUv.x < (uline.x+width))
        // {
        //     strgt = 0.0;
        // }

        vec3 finalstr = strgt2;
        gl_FragColor = vec4(mixedColor.x*finalstr.x,mixedColor.y*finalstr.y,mixedColor.z*finalstr.z,strgt);
        // gl_FragColor = vec4(cols,cols,cols,1.0);


        
      }
