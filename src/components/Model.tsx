import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from "./ModelView";
import { useRef, useState, useEffect } from "react";
import { yellowImg } from "../utils";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateScrollWithGSAP, animateWithGSAPTimeline } from "../utils/animations";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface modelType {
  title: string
  color: string[]
  img: string
}

function Model() {
  useGSAP(() => {
    animateScrollWithGSAP('#heading', {
      opacity: 1,
      y: 0
    })
  }, []);

  const [size, setSize] = useState<string>('small');
  const [model, setModel] = useState<modelType>({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg
  })


  // camera per size, 6.1", 6.7"'
  const cameraControlSmall = useRef<OrbitControlsImpl>(null);
  const cameraControlLarge = useRef<OrbitControlsImpl>(null);

  // current model control
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation tracking
  const [smallRot, setSmallRot] = useState(0);
  const [largeRot, setLargeRot] = useState(0);

  // touchscreen swipe tracking
  const [isInteracting, setIsInteracting] = useState(true);

  // animating switching between the sizes
  const tl = gsap.timeline();
  useEffect(() => {
    if(size === 'large')
      animateWithGSAPTimeline(tl, small, smallRot, '#view1', '#view2', {transform: 'translateX(-100%)'});
    
    if(size === 'small')
      animateWithGSAPTimeline(tl, large, largeRot, '#view2', '#view1', {transform: 'translateX(0)'});
  
  }, [size])
  
  useGSAP(() => {
    gsap.to(".color-select", {
      scale: 1,
      ease: 'power3.out'
    })

    gsap.to(`#color-select-${'\\' + model.color[0]}`, {
      scale: 1.25,
      ease: 'power3.out',
    })
  }, [model]);


  return (
    <section className="common-padding">
      <div id="section-content-model" className="">
        <h1 id="heading" className="section-heading screen-max-width">
          Take a closer look.
        </h1>

        <div className="flex flex-col mt-5 items-center">
          <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden">
            <ModelView 
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotState={setSmallRot}
              model={model}
              size={size}
              isInteracting={isInteracting}
              setIsInteracting={setIsInteracting}
            />
            <ModelView 
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotState={setLargeRot}
              model={model}
              size={size}
              isInteracting={isInteracting}
              setIsInteracting={setIsInteracting}
            />

            <Canvas
              id="phone3D"
              className="fixed! w-full h-[100vh] sm:h-full top-0 left-0 bottom-0 right-0 overflow-hidden pointer-events-none contain-strict will-change-transform"
              eventSource={document.getElementById('root')!}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">
              {model.title}
            </p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li 
                  key={index}
                  id={`color-select-${item.color[0]}`}
                  className={`color-select relative w-6 h-6 rounded-full mx-2 cursor-pointer ${model.color[0] !== item.color[0] ? '' : 'rounded-outline-before'} border-color-[${item.color[0]}]`} 
                  style={{backgroundColor: item.color[0]}}
                  onClick={() => setModel(item)}
                  >    {/*! I think style is used here for dynamic application of colors that are coming from another JS file... other way would be to use @apply and custom predefined classes like how I'd done in Epoque Calendars! */}
                  </li>
                ))}
              </ul>

              <button className="size-btn-container cursor-pointer">
                {sizes.map(({ label, value }, _) => (
                  <span 
                  key={label}
                  className="size-btn"
                  style={{
                    backgroundColor: size === value ? 'white' : 'transparent',
                    color: size === value ? 'black' : 'white'
                  }}
                  onClick={() => setSize(value)}
                  > 
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model;