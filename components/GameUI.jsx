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
                        onMouseDown={()=>{appContext.ModelController.current('ENABLE-VERTICAL-ROTATION-+')}} 
                        onMouseUp={()=>{appContext.ModelController.current('DISABLE-VERTICAL-ROTATION-+')}}  
                        
                        className="w-full h-full bg-white"></div>
                </div>
                <div className="z-[2] w-[150px] h-[25px] absolute left-0 right-0 mx-auto bottom-[60px]
                                flex justify-between ">
                        <div onMouseDown={()=>{appContext.ModelController.current('ENABLE-HORIZONTAL-ROTATION--')}} 
                             onMouseUp={()=>{appContext.ModelController.current('DISABLE-HORIZONTAL-ROTATION--')}} 
                             className="w-[25px] h-[25px] bg-red-500 "></div>
                             <div 
                            onClick={()=>{appContext.ModelController.current('SHOT')}} 
                             
                            className="w-[25px] h-[25px] bg-white "></div>
                        <div 
                            onMouseDown={()=>{appContext.ModelController.current('ENABLE-HORIZONTAL-ROTATION-+')}} 
                            onMouseUp={()=>{appContext.ModelController.current('DISABLE-HORIZONTAL-ROTATION-+')}} 
                            className="w-[25px] h-[25px] bg-blue-500 "></div>
                </div>
                <div className="z-[2] w-[25px] h-[25px] absolute left-0 right-0 mx-auto bottom-[0]
                                flex justify-between ">
                        <div
                        onMouseDown={()=>{appContext.ModelController.current('ENABLE-VERTICAL-ROTATION--')}} 
                        onMouseUp={()=>{appContext.ModelController.current('DISABLE-VERTICAL-ROTATION--')}}   
                        
                        className="w-full h-full bg-white"></div>
                </div>

            </>
    )
}