uniform vec3 intersectPoint;
varying vec2 vUv;
  // uniform float utime;
      void main() { 
        vUv = uv;
        vec3 objPosition = vec3(position);
        vec3 extraPosition = vec3(0.0,0.0,0.0);

        if(position.z >= 7.0 )
        {
          objPosition.z = intersectPoint.z;
          
        }
        else
        {
          // objPosition.y = 0.0;
        }
        vec4 modelPosition = modelViewMatrix * vec4(objPosition.x,objPosition.y,objPosition.z, 1.0);
        gl_Position = projectionMatrix * modelPosition;
      }
