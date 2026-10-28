    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vNormal;

      void main() {
        // éclairage simple (lumière fixe en espace caméra) pour donner du volume à la sphère
        vec3 lightDir = normalize(vec3(-0.4,0.8,0.6));
        float diffuse = max(dot(normalize(vNormal),lightDir),0.0);
        vec3 baseColor = uColor*(0.35 + 0.65*diffuse);

        gl_FragColor = vec4(applyBurn(baseColor, vUv),1.0);
      }
