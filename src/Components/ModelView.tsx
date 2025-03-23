import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import Lights from "./Lights"
import { SetStateAction, Suspense, useRef, Dispatch } from "react"
import IPhone from "./IPhone"
import * as THREE from 'three';
import Loader from "./Loader"
import { modelType } from "./Model";


interface ModelViewPropTypes {
  index: 1 | 2
  groupRef: any
  gsapType: string
  controlRef: any
  setRotState: Dispatch<SetStateAction<number>>
  size: string
  model: modelType
}

function ModelView({index, groupRef, gsapType, controlRef, setRotState, size, model}: ModelViewPropTypes) {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute w-full h-full ${index === 2 ? '-right-full': ''}`}
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
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotState(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={`${index === 1 ? 'small' : 'large'}`} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={size === 'small' ? [15, 15, 15] : [17, 17, 17]}
            model={model}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView