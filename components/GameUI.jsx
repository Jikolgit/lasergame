import { useContext, useEffect } from "react"
import { AppContext } from "../src/App"

export function GameButton()
{
    let appContext = useContext(AppContext);
    let verticalRotation = ()=>{}
    let horizontalRotation = ()=>{}
    useEffect(()=>
        {
        },[])
    return(
            <>
                <div className="z-[2] w-[25px] h-[25px] absolute left-0 right-0 mx-auto bottom-[120px]
                                flex justify-between ">
                        <div
                        onTouchStart={()=>{appContext.ModelController.current('ENABLE-VERTICAL-ROTATION-+')}} 
                        onTouchEnd={()=>{appContext.ModelController.current('DISABLE-VERTICAL-ROTATION-+')}}  
                        
                        className="w-full h-full bg-white"></div>
                </div>
                <div className="z-[2] w-[150px] h-[25px] absolute left-0 right-0 mx-auto bottom-[60px]
                                flex justify-between ">
                        <div onTouchStart={()=>{appContext.ModelController.current('ENABLE-HORIZONTAL-ROTATION--')}} 
                             onTouchEnd={()=>{appContext.ModelController.current('DISABLE-HORIZONTAL-ROTATION--')}} 
                             className="w-[25px] h-[25px] bg-red-500 "></div>
                             <div 
                            onTouchStart={()=>{appContext.ModelController.current('LASER-START')}} 
                            onTouchEnd={()=>{appContext.ModelController.current('LASER-END')}} 
                             
                            className="w-[25px] h-[25px] bg-white "></div>
                        <div 
                            onTouchStart={()=>{appContext.ModelController.current('ENABLE-HORIZONTAL-ROTATION-+')}} 
                            onTouchEnd={()=>{appContext.ModelController.current('DISABLE-HORIZONTAL-ROTATION-+')}} 
                            className="w-[25px] h-[25px] bg-blue-500 "></div>
                </div>
                <div className="z-[2] w-[25px] h-[25px] absolute left-0 right-0 mx-auto bottom-[0]
                                flex justify-between ">
                        <div
                        onTouchStart={()=>{appContext.ModelController.current('ENABLE-VERTICAL-ROTATION--')}} 
                        onTouchEnd={()=>{appContext.ModelController.current('DISABLE-VERTICAL-ROTATION--')}}   
                        
                        className="w-full h-full bg-white"></div>
                </div>

            </>
    )
}