
    uniform float utime;
    uniform vec3 uColor;
    uniform vec2 uline;
    uniform vec2 prevUline;
    uniform float cursorVisible;
    uniform float mx;
    uniform float my;
    uniform vec3 intersectPoint;
    uniform sampler2D utexture;
    uniform sampler2D uBurn;
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
      // chaleur (0..1) -> couleur de la brûlure : rouge sombre, rouge vif, puis blanc-jaune au coeur
      vec3 burnColor(float heat)
      {
        vec3 cold = vec3(0.35,0.0,0.02);
        vec3 red = vec3(1.0,0.08,0.05);
        vec3 hot = vec3(1.0,0.9,0.7);
        vec3 col = mix(cold,red,smoothstep(0.05,0.45,heat));
        col = mix(col,hot,smoothstep(0.7,1.0,heat));
        return col;
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
        vec3 wallColor = mixedColor.xyz*finalstr;

        // le refroidissement du canvas (8 bits) laisse un résidu d'alpha très faible : on l'ignore
        float heat = clamp((texture2D(uBurn, vUv).a - 0.06)/0.94, 0.0, 1.0);
        float burnMask = smoothstep(0.03,0.25,heat);
        wallColor = mix(wallColor,burnColor(heat),burnMask);
        wallColor += vec3(1.0,0.15,0.05)*heat*0.6;

        gl_FragColor = vec4(wallColor,strgt);
        // gl_FragColor = vec4(cols,cols,cols,1.0);


        
      }
