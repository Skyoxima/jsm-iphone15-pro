import * as THREE from 'three'
import { RefObject } from 'react'

export function animateWithGSAPTimeline(tl: GSAPTimeline, 
  groupRef: RefObject<THREE.Group<THREE.Object3DEventMap>>, 
  rotState: number, 
  from: string, 
  to: string): void {
  // tl.to(groupRef.current.rotation)
}