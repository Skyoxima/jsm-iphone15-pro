import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from "./ModelView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";


export interface modelType {
  title: string
  color: string[]
  img: string
}

function Model() {
  useGSAP(() => {
    gsap.to('#heading', {
      opacity: 1,
      y: 0
    })
  })

  const [size, setSize] = useState<string>('small');
  const [model, setModel] = useState<modelType>({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg
  })


  // camera per size, 6.1", 6.7"'
  // TODO: GIVE TYPES
  const cameraControlSmall = useRef<any>(null);
  const cameraControlLarge = useRef<any>(null);

  // current model control
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation tracking
  const [smallRot, setSmallRot] = useState(0);
  const [largeRot, setLargeRot] = useState(0);


  return (
    <section className="common-padding">
      <div id="section-content-model" className="">
        <div id="heading" className="section-heading screen-max-width">
          Take a closer look.
        </div>

        <div className="flex flex-col mt-5 items-center">
          <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden">
            <ModelView 
              index={1}
              groupRef={small}
              gsapType={'view1'}
              controlRef={cameraControlSmall}
              setRotState={setSmallRot}
              model={model}
              size={size}
            />
            <ModelView 
              index={2}
              groupRef={large}
              gsapType={'view2'}
              controlRef={cameraControlLarge}
              setRotState={setLargeRot}
              model={model}
              size={size}
            />

            <Canvas
              id="phone3D"
              className="fixed! w-full h-full inset-0 overflow-hidden"
              // style={{top: 0, left: 0, right: 0, bottom: 0}}
              eventSource={document.getElementById('root')!}>
              <View.Port />
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">
              {model.title}
            </p>

            <div className="flex-center">
              <ul className="color-container">
                {models.map((model, index) => (
                  <li 
                  key={index} 
                  className="w-6 h-6 rounded-full mx-2 cursor-pointer" 
                  style={{backgroundColor: model.color[0]}}
                  onClick={() => setModel(model)}
                  >    {/*! I think style is used here for dynamic application of colors that are coming from another JS file... other way would be to use @apply and custom predefined classes like how I'd done in Epoque Calendars! */}
                  </li>
                ))}
              </ul>

              <button className="size-btn-container cursor-pointer">
                {sizes.map(({ label, value }, index) => (
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