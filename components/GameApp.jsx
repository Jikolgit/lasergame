import * as THREE from 'three'
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Model2 } from "../Model2";
import { createContext, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RayCastTest } from './RayCastTest';

export const GameAppContext  = createContext();
export function GameApp()
{
  const {scene,camere} = useThree();
  const object1Ref = useRef();
  const object2Ref = useRef();


  useFrame(({clock})=>
    {
        
        // const box1 = new THREE.Box3().setFromObject(object1Ref.current);
        // const box2 = new THREE.Box3().setFromObject(object2Ref.current);

        // if (box1.intersectsBox(box2)) {
        //   console.log('c')
        // }
    })
    return(
            <>
                <GameAppContext.Provider value={{object1Ref,object2Ref}}>
                        <axesHelper args={[30]} />
                         <Model2 />
                        {/* <RayCastTest /> */}
                        <PerspectiveCamera position={[-15,12,15]} makeDefault />
                        <OrbitControls target={[15,0,15]} />
                </GameAppContext.Provider>
            </>
    )
}


