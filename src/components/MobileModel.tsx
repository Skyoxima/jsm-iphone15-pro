import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MobileModelView from "./MobileModelView";
import { useRef, useState, useEffect } from "react";
import { yellowImg } from "../utils";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateScrollWithGSAP } from "../utils/animations";

// this is for the type declarations
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export interface modelType {
  title: string
  color: string[]
  img: string
}

function MobileModel() {
  useGSAP(() => {
    animateScrollWithGSAP('#heading', {
      opacity: 1,
      y: 0
    })
  }, []);
  
  const [size, setSize] = useState<string>('small');

  const [isInView, setIsInView] = useState(false);

  // model in use's properties
  const [model, setModel] = useState<modelType>({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg
  })
  
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const cameraControl = useRef<OrbitControlsImpl>(null);

  // Set up intersection observer to track if section is in view
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when visibility changes
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Consider visible when 10% is in view
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  
  // selected color button animation
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
    <section className="common-padding" ref={containerRef}>
      <div id="section-content-model" className="">
        <h1 id="heading" className="section-heading screen-max-width">
          Take a closer look.
        </h1>

        <div className="flex flex-col mt-5 items-center">
          <div className="relative w-[70%] h-[75vh] md:h-[90vh] overflow-hidden" ref={viewRef}>
            <MobileModelView 
              viewRef={viewRef}
              controlRef={cameraControl}
              model={model}
              size={size}
            />
            <Canvas
              id="phone3D"
              className="absolute! w-full h-full top-0 left-0 pointer-events-none overflow-hidden"
              eventSource={containerRef.current!}
              eventPrefix="page"
              dpr={[1, 1]}
              camera={{ position: [0, 0, 4], fov: 50 }}
              frameloop="demand"
              onCreated={(state) => {
                state.gl.localClippingEnabled = true;
              }}
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

export default MobileModel;