import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel2 from "./VideoCarousel2";

function Highlights2() {
  useGSAP(() => {
    gsap.to('#title', {
      opacity: 1, y: 0
    })
    gsap.to('.link', {
      opacity: 1, y: 0, duration: 1, stagger: 0.25
    })
  }, []);

  return (
    <section id="highlights" className="w-screen h-full common-padding bg-zinc-900 overflow-hidden">
      <div id="section-content-hlts" className="">
        <div className="mb-12 w-full md:flex items-end justify-between screen-max-width">
          <h1 id="title" className="section-heading">Get the highlights.</h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch this film
              <img src={watchImg} alt='Watch' className="ml-2"/>
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt='Right' className="ml-2"/>
            </p>
          </div>
        </div>
        <VideoCarousel2 />
      </div>
    </section>
  )
}

export default Highlights2