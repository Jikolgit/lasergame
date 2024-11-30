import { useFrame, useThree } from '@react-three/fiber';
import { useContext, useEffect, useRef, useState } from 'react';
import * as THREE from 'three'
import { AppContext } from '../src/App';
import vertex from './vertex.glsl'
import frags from './frags.glsl'
import { useTexture } from '@react-three/drei';
export function RayCastTest()
{
    let txt = useTexture('ntxt4.jpg')
    let appContext = useContext(AppContext)
    let {scene} = useThree();
    let rayPosition = new THREE.Vector3(0,0,0)
    let rayDirection = new THREE.Vector3(1,0,0).normalize()
    let setOnce = useRef(false);
    let circleRef = useRef(null)
    let [objContainer,setObjContainer] = useState([]);
    let rayCaster = new THREE.Raycaster()
    let cube1Ref = useRef(null);
    let intersection = null;
    
    // rayCaster.set(rayPosition,rayDirection)
  

    // useFrame(()=>
    //   {

        
    //     intersection = rayCaster.intersectObject(cube1Ref.current)
        
    //     if (intersection.length > 0) {
    //         // console.log(intersection.length)

    //       } else {
    //         console.log('Aucune intersection')
    //       }
        
          
    //   })
    // let rayy = ()=>
    //     {
    //         let rayCaster = new THREE.Raycaster()
    //         rayCaster.set(rayPosition,rayDirection)
    //         intersection = rayCaster.intersectObject(cube1Ref.current)
    //         console.log(intersection)
    //     }
    useEffect(()=>
        {
            // let cubeTeste = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'red'}))
            // cubeTeste.position.set(5,0,0)
            // scene.add(cubeTeste);

            // appContext.RayCastController.current = (args)=>
            //     {
            //         let rayCaster = new THREE.Raycaster()
            //         rayCaster.set(rayPosition,rayDirection)
            //         intersection = rayCaster.intersectObject(cube1Ref.current)
            //         console.log(intersection)
            //     }

            return()=>
            {
                
                cube1Ref.current = null
            }
        },[])
    let castRay = (x,y,z)=>
        {
            
            // if(!setOnce.current)
            // {   console.log('Ray')
            //     setOnce.current = true;
                
                rayCaster.set(rayPosition,new THREE.Vector3(x,y,z).normalize())
                intersection = rayCaster.intersectObject(cube1Ref.current)
                if(intersection.length>0)
                {
                    cube1Ref.current.material.uniforms.uline.value = new THREE.Vector2(intersection[0].uv.x,intersection[0].uv.y)
                    circleRef.current.visible = true
                    circleRef.current.position.x = intersection[0].point.x
                    circleRef.current.position.y = intersection[0].point.y
                    circleRef.current.position.z = intersection[0].point.z
                }
                console.log(intersection)
            //}
        }
    let addSphere = (evt)=>
        {   
            castRay(evt.point.x,evt.point.y,evt.point.z)
            // console.log(evt.uv.x)
            // console.log(evt.point.x+' et '+evt.point.y+' et '+evt.point.z)
            // cube1Ref.current.material.uniforms.uline.value = new THREE.Vector2(evt.uv.x,evt.uv.y)
            // circleRef.current.visible = true
            // circleRef.current.position.x = evt.point.x
            // circleRef.current.position.y = evt.point.y
            // circleRef.current.position.z = evt.point.z
            // _obj.current.push(
            //                     <mesh key={_obj.current.length} position={[evt.point.x,evt.point.y,evt.point.z]} >
            //                         <sphereGeometry args={[1,20,20]} />
            //                         <meshBasicMaterial color={'blue'} />
            //                     </mesh>
            // )
            // setObjContainer([..._obj.current])
        }
    useFrame(()=>
        {
            cube1Ref.current.material.uniforms.utime.value += 0.05 
        })
    return(
            <>
                <mesh  ref={cube1Ref} position={[15,0,0]} rotation={[0,-(Math.PI*90)/180,0]}>
                    <planeGeometry args={[10,10,10]} />
                    <shaderMaterial transparent vertexShader={vertex} fragmentShader={frags} uniforms={{utime:{value:1.0},uColor:{value:new THREE.Vector3(0,0,1.0)},
                                                                                            utexture:{value:txt}, uline:{value:new THREE.Vector2(0,0)} }} />
                    
                </mesh>
                {objContainer}
                <mesh ref={circleRef}  visible={false} position={[0,0,0]} >
                                    <sphereGeometry args={[0.1,20,20]} />
                                    <meshBasicMaterial color={'red'} />
                </mesh>
                {/* <mesh position={[7,0,0]}>
                    <boxGeometry args={[1,1,1]} />
                    <meshBasicMaterial color={'red'} />
                </mesh>
                <mesh   position={[9,0,0]}>
                    <boxGeometry args={[1,1,1]} />
                    <meshBasicMaterial color={'red'} />
                </mesh> */}
            </>
    )
}