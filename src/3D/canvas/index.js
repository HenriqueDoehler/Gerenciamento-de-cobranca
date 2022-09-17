import React, { Suspense} from "react";
import { Canvas} from "@react-three/fiber";
import { Float } from "@react-three/drei";
import {Model} from '../model/index'
import './styles.css'


 function ThreeD() {
  
  return (
    <div  className="canvas-display">
        <Canvas camera={{ fov: 45, far:100 }}>
      <ambientLight intensity={3} position={[0,0,0]}/>
       <Suspense  fallback={null} > 
        <Float 
         speed={1} 
         rotationIntensity={3} 
         floatIntensity={3} 
         floatingRange={[-1.5,-0.9]} >
         <Model  
         rotation={[0,0,0]}
         position={[9, -7, -18]} 
         scale={20}
      />
      </Float>
      </Suspense>
    </Canvas>
    </div>
    
  );
}

export default ThreeD