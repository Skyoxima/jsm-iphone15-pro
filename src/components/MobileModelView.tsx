import { PerspectiveCamera, View, OrbitControls } from "@react-three/drei"
import Lights from "./Lights"
import React, { SetStateAction, Suspense, Dispatch } from "react"
import IPhone from "./IPhone"
import * as THREE from 'three';
import Loader from "./Loader"
import { modelType } from "./Model";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";


interface MobileModelViewPropTypes {
  gsapType: string
  controlRef: React.RefObject<OrbitControlsImpl | null>
  setRotState: Dispatch<SetStateAction<number>>
  size: string
  model: modelType
  isInteracting: boolean
  setIsInteracting: Dispatch<SetStateAction<boolean>>
}



function MobileModelView({gsapType, controlRef, setRotState, size, model, isInteracting, setIsInteracting}: MobileModelViewPropTypes) {
  return (
    <View
      id={gsapType}
      className={`absolute w-full h-full`}
    >
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls 
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        enabled={isInteracting}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={
          () => {
            setRotState(controlRef.current!.getAzimuthalAngle())
          }
        }
      />

      <Suspense fallback={<Loader />}>
        <IPhone
          scale={size === 'small' ? [15, 15, 15] : [17, 17, 17]}
          model={model}
          size={size}
        />
      </Suspense>
    </View>
  )
}

export default MobileModelView