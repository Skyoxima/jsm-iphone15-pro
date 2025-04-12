import { PerspectiveCamera, View, OrbitControls } from "@react-three/drei"
import Lights from "./Lights"
import React, {Suspense, useEffect, useRef } from "react"
import IPhone from "./IPhone"
import * as THREE from 'three';
import Loader from "./Loader"
import { modelType } from "./Model";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface MobileModelViewPropTypes {
  viewRef: React.RefObject<HTMLDivElement | null>
  controlRef: React.RefObject<OrbitControlsImpl | null>
  size: string
  model: modelType
}



function MobileModelView({controlRef, size, model, viewRef}: MobileModelViewPropTypes) {
  
  const scrollingRef = useRef<boolean>(false),
        lastScrollTime = useRef(0);
  

  // used to disable controls on the 3D model when scrolling, can be lifted up to MobileModel for dpr controls too...
  useEffect(() => {
    const handleScroll = () => {
      scrollingRef.current = true;
      lastScrollTime.current = Date.now();
      
      // Reset the scrolling flag after scrolling stops
      setTimeout(() => {
        if (Date.now() - lastScrollTime.current >= 100) {
          scrollingRef.current = false;
        }
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <View
      id="mobile-view"
      track={viewRef as React.RefObject<HTMLElement>}
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
        enabled={!scrollingRef.current}
        target={new THREE.Vector3(0, 0, 0)}
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