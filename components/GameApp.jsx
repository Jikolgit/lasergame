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


  useFrame(({clock})=>
    {
        
    })
    return(
            <>
                <GameAppContext.Provider value={{}}>
                        {/* <axesHelper args={[30]} /> */}
                         <Model2 />
                        {/* <RayCastTest /> */}
                        <PerspectiveCamera position={[-15,12,15]} makeDefault />
                        <OrbitControls 
                        maxAzimuthAngle={(-50*Math.PI)/180} 
                        minAzimuthAngle={(250*Math.PI)/180} 
                        minPolarAngle={(45*Math.PI)/180} 
                        maxPolarAngle={(90*Math.PI)/180} 
                        enableDamping={true} enablePan={false} enableRotate={true} enableZoom={false} target={[15,0,15]} />
                </GameAppContext.Provider>
            </>
    )
}


