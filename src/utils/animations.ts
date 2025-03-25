import * as THREE from 'three'
import { RefObject } from 'react'

export function animateWithGSAPTimeline(tl: GSAPTimeline, groupRef: RefObject<THREE.Group<THREE.Object3DEventMap>>, rotState: number, firstTarget: string, secondTarget: string, animProps: {[key: string]: string | number}): void {
  // when switching between models, this one maintains separate rotations in space for the 2 sizes, so before bringing in the "other" model,...
  // ...first rotate it to what it when used the last time. It will be 0 when going from small -> large the first time
  tl.to(groupRef.current.rotation, {
    y: -rotState,
    duration: 1,
    ease: 'power2.inOut'
  })

  // 'swipe' between the 2 models
  // first case - small model translates to left by translateX(-100%) and the... 
  // second case - ...large one comes into view by the same since it is already -right-full

  tl.to(firstTarget, {
    ...animProps,
    duration: 2,
    ease: 'power2.inOut'
  }, '<')

  // less than indicates that this animation should also start when the immediate previous one does

  tl.to(secondTarget, {
    ...animProps,
    duration: 2,
    ease: 'power2.inOut'
  }, '<')
}