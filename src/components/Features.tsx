import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { animateScrollWithGSAP } from "../utils/animations"
import { useRef, useEffect, useState } from "react"
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { ScrollTrigger } from "gsap/all";
import Skeleton from "./Skeleton";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);


  //* This here is what is handling Skeleton swap. Skeleton is responsible for correct ScrollTrigger markers position
  const handleLoad = () => {
    setLoaded(true);
    // ScrollTrigger.refresh();       // Without Skeleton, refreshing ScrollTrigger here also worked! But anyways I wanted to add Skeletons for better practice.
  }


  useEffect(() => {
    imgRefs.current[0].addEventListener('load', handleLoad);
    imgRefs.current[1].addEventListener('load', handleLoad);
    
    return () => {
      imgRefs.current[0].removeEventListener('load', handleLoad);
      imgRefs.current[1].removeEventListener('load', handleLoad);
    }
  }, [])
  

  useGSAP(() => {
    animateScrollWithGSAP('#feature-heading', {y: 0, opacity: 1});
    animateScrollWithGSAP('.g_grow', {scale: 1, opacity: 1, ease: 'power1'}, {scrub: 5.5});
    animateScrollWithGSAP('.g_text', {y: 0, opacity: 1, ease: 'power2.inOut', duration: 1});

    gsap.to('#explore-video', {
      scrollTrigger: {
        trigger: '#explore-video',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current?.play();
      }
    })
  }, [])

  return (
    <section id="features" className="relative h-full common-padding bg-zinc-900">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="feature-heading" className="section-heading">
            Explore the full story.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center">
          {/* Section subtitle */}
          <div className="mt-8 mb-12 lg:mt-32 lg:mb-24 self-start pl-2 sm:pl-10 lg:pl-16 xl:pl-24">
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
          </div>

          {/* Video */}
          <div className="flex-center flex-col sm:px-10">
            <div className="relative w-full h-[50vh] flex items-center">
              <video
                id="explore-video"
                className="w-full h-full object-cover object-center"
                playsInline
                muted
                autoPlay
                preload="none"
                ref={videoRef}>
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>

            <div className="relative flex flex-col w-full">
              {/* Images 1 & 2 */}
              <div className="feature-video-container">
                <div className="relative overflow-hidden w-full h-[50vh]">
                  <img src={explore1Img} alt="Titanium" className="feature-video g_grow" ref={(e: HTMLImageElement) => {imgRefs.current[0] = e}} />
                  {!loaded && <Skeleton />}
                </div>
                <div className="relative overflow-hidden w-full h-[50vh]">
                  <img src={explore2Img} alt="Titanium" className="feature-video g_grow" ref={(e: HTMLImageElement) => {imgRefs.current[1] = e}} />
                  {!loaded && <Skeleton />}
                </div>
              </div>

              {/* Post-images text */}
              <div className="feature-text-container">
                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    iPhone 15 Pro is {' '}
                    <span className="text-white">the first iPhone to feature an aerospace-grade titanium design</span>,
                    using the same alloy that spacecrafts use for missions to Mars.
                  </p>
                </div>

                <div className="flex-1 flex-center">
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                    <span className="text-white">lightest Pro models ever.</span>,
                    You'll notice the difference the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}