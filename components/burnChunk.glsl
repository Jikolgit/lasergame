      // partagé par les shaders qui affichent une trace de brûlure (mur, sphère)
      uniform sampler2D uBurn;

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
      // applique la brûlure de la carte uBurn sur une couleur de base
      vec3 applyBurn(vec3 baseColor, vec2 uv)
      {
        // le refroidissement du canvas (8 bits) laisse un résidu d'alpha très faible : on l'ignore
        float heat = clamp((texture2D(uBurn, uv).a - 0.06)/0.94, 0.0, 1.0);
        float burnMask = smoothstep(0.03,0.25,heat);
        vec3 col = mix(baseColor,burnColor(heat),burnMask);
        col += vec3(1.0,0.15,0.05)*heat*0.6;
        return col;
      }
