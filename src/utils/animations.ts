import * as THREE from 'three'
import { RefObject } from 'react'
import { ScrollTrigger } from 'gsap/all'
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

export function animateScrollWithGSAP(target: string, animationProps: {[key: string]: string | number}, scrollProps?: {[key: string]: string | number}) {
  gsap.to(target, {
    ...animationProps,
    scrollTrigger: {
      trigger: target,
      toggleActions: 'restart reverse restart reverse',
      start: 'top 85%',
      ...scrollProps
    }
  })
}

// toggleActions: first is for when the element first enters the viewport, second is when it leaves for the first time, third is when it reenters (reverse direction) and fourth is when it re-leaves (reverse direction) 
// start → when the top of the trigger is 85% away FROM the top of the viewport...
// ..."Means the animation starts when the top of the target reaches 85% down the viewport."



// used in 3D model swapping
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