import { createContext, useRef, useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { GameApp } from '../components/GameApp'
import { GameButton } from '../components/GameUI'

export const AppContext = createContext()
function App() {
  const showTouchPad = useRef(true);
  const GameButtonController = useRef(null)
  const ModelController = useRef(null);
  const RayCastController = useRef(null);
  return (
    <>
        <AppContext.Provider value={{GameButtonController,ModelController,RayCastController,showTouchPad}}>
              <div 
                  
                  className={`bg-black font-times absolute max-w-[700px] left-[0] right-[0] mx-auto  w-full font-times
                              md1:h-[100%] md1:max-h-[700px] h-[500px] select-none `}
              >
                  <Canvas>
                      <GameApp />
                  </Canvas>
                  <GameButton />
              </div>
         </AppContext.Provider>
    </>
  )
}

export default App
