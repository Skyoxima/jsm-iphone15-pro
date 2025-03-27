import { chipImg, frameImg, frameVideo } from "../utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { animateScrollWithGSAP } from "../utils/animations";

gsap.registerPlugin(ScrollTrigger)

function Chip() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    //* Check that we're using gsap.from for the first time in this project, refer to the GSAP crash course for more info on it, for now, remember that the parameters passed here are the start of the animation, rather than the end
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom'
      },
      opacity: 0,
      duration: 2,
      scale: 2,
      ease: 'power2.inOut'
    })

    animateScrollWithGSAP('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut'
    })
  }, [])

  return (
    <section className="common-padding" id="chip-section">
      <div className="screen-max-width">
        {/* Chip Img */}
        <div id="chip" className="w-full flex-center my-20">
          <img src={chipImg} alt="A17 Bionic Pro" width={180} height={180} />
        </div>

        {/* Chip Description */}
        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro Chip.
            <br /> A monster win for gaming.
          </h2>
          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>


        {/* Gameplay video Frame */}
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative flex-center overflow-hidden">
            <img
              src={frameImg}
              alt="frame"
              className="bg-transparent relative z-10"
            />
            <video className="hiw-video pointer-events-none" playsInline preload="none" muted autoPlay ref={videoRef}>
              <source src={frameVideo} type="video/mp4" />
            </video>
          </div>
          <p className="text-gray font-semibold text-center mt-3">Honkai: Star Rail</p>
        </div>

        {/* GPU highlight */}
        <div className="hiw-text-container">
          <div className="flex flex-1 flex-col justify-center">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
              <span className="text-white">best graphic performace so far.</span>
            </p>
            <p className="hiw-text g_fadeIn">
              Mobile {' '}
              <span className="text-white">games will look and feel so immersive </span>,
              with incredibly detailed environments and characters.
            </p>
          </div>
          
          
          <div className="flex flex-1 flex-col justify-center g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">6 cores</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chip;