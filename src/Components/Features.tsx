import gsap from "gsap";
import { useGSAP } from "@gsap/react"
import { animateScrollWithGSAP } from "../utils/animations"
import { useRef } from "react"
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {

  const videoRef = useRef<HTMLVideoElement>(null);

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
    <section id="features" className="relative h-full common-padding bg-zinc-900 overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="feature-heading" className="section-heading">
            Explore the full story.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-8 mb-12 lg:mt-32 lg:mb-24 self-start pl-2 sm:pl-10 lg:pl-16 xl:pl-24">
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-semibold">iPhone.</h2>
            <h2 className="text-2xl sm:text-5xl lg:text-7xl font-semibold">Forged in titanium.</h2>
          </div>

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
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore1Img} alt="Titanium" className="feature-video g_grow" />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh]">
                  <img src={explore2Img} alt="Titanium" className="feature-video g_grow" />
                </div>
              </div>

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