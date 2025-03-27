import { useState, useRef, useEffect } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

interface stateType {
  isEnd: boolean
  startPlay: boolean
  videoID: number
  isPlaying: boolean
  isLastVideo: boolean
}

export default function VideoCarousel() {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoInnerSpanRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState<stateType>({
    isEnd: false,
    startPlay: false,
    videoID: 0,
    isLastVideo: false,
    isPlaying: false
  })
  const { isEnd, startPlay, videoID, isLastVideo, isPlaying } = video;

  //>> To make the videos start playing after they come into the viewport
  useGSAP(() => {
    gsap.to('#carousel-tape', {
      translateX: `${(window.innerWidth < 640 ? -96 : -78) * (videoID)}vw`,
      duration: 1,
      ease: 'power2.inOut'
    })

    gsap.to('.video', {
      scrollTrigger: {
        trigger: '.video',
        toggleActions: 'restart none none none'
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev, startPlay: true, isPlaying: true
        }))
      }
    })
  }, [isEnd, videoID])

  const [loadedData, setLoadedData] = useState<React.SyntheticEvent<HTMLVideoElement, Event>[]>([])

  //>> control the scrolling and continuous playing of the videos in the carousel
  useEffect(() => {
    // carousel autoplay has reached its end
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoID].pause();
      } else {
        startPlay && videoRef.current[videoID].play();
      }
    }
  }, [startPlay, videoID, isPlaying, loadedData])

  const handleLoadedMetadata = (index: number, event: React.SyntheticEvent<HTMLVideoElement, Event>) => setLoadedData((prev) => [...prev, event])


  //>> control the progress animation for the current video in the carousel
  useEffect(() => {
    let currentProgess = 0;
    let innerSpan = videoInnerSpanRef.current;

    if (innerSpan[videoID]) {
      let anim = gsap.to(innerSpan[videoID], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);  //? maybe multiply outside

          if (progress !== currentProgess) {
            currentProgess = progress;

            //* I've kept this different than the original video for consistency
            gsap.to(videoSpanRef.current[videoID], {
              width: window.innerWidth < 480 ? '2rem' : '3rem',
            })

            gsap.to(innerSpan[videoID], {
              width: `${currentProgess}%`,
              backgroundColor: 'white'
            })
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoSpanRef.current[videoID], {
              width: '12px'
            })
            gsap.to(innerSpan[videoID], {
              backgroundColor: 'transparent'
            })
          }
        }
      });

      if (videoID === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoID].currentTime / videoRef.current[videoID].duration
        );
      }

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

    }
  }, [videoID, startPlay]);



  //>> Current video playback controls
  const handleProcess = (processID: string, i: number = 1) => {
    switch (processID) {
      case 'videoEnd':
        setVideo((prev) => ({ ...prev, isEnd: true, videoID: i + 1 }));
        break;
      case 'videoLast':
        setVideo((prev) => ({ ...prev, isLastVideo: true, }));
        break;
      case 'videoReset':
        setVideo((prev) => ({ ...prev, videoID: 0, isLastVideo: false }));
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
        break;

      default:
        return video;
    }
  }

  return (
    <>
      {/* The video carousel */}
      <div id='carousel-tape' className="relative -left-[4vw] sm:left-[8vw] flex w-max justify-center">
        {hightlightsSlides.map((list, index) => (
          <div key={index} className="padded-video-container px-[4vw]">
            <div key={index} className={`video-container flex-center shrink-0 bg-black rounded-3xl overflow-hidden`}>
              <video
                className={`video pointer-events-none`}
                preload="auto" 
                playsInline={true}
                muted
                ref={(el: HTMLVideoElement) => { videoRef.current[index] = el }}
                onPlay={() => { setVideo((prev) => ({ ...prev, isPlaying: true })) }}
                onLoadedMetadata={(e) => handleLoadedMetadata(index, e)}
                onEnded={() => { index !== 3 ? handleProcess('videoEnd', index) : handleProcess('videoLast') }}>
                <source src={list.video} type="video/mp4" />
              </video>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-lg md:text-2xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*>> Progress bar and control button */}
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-zinc-800 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span key={i} ref={(el: HTMLSpanElement) => { videoSpanRef.current[i] = el }}
              className="relative size-3 mx-2 bg-zinc-300 rounded-full cursor-pointer">
              <span className="absolute size-full rounded-full" ref={(el: HTMLSpanElement) => { videoInnerSpanRef.current[i] = el }}></span>
            </span>
          ))}
        </div>

        <button className="control-btn cursor-pointer relative"
          onClick={
            isLastVideo ? () => handleProcess('videoReset')
            : isPlaying ? () => handleProcess('pause')
            : () => handleProcess('play')}>
          <img 
            src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt={isLastVideo ? 'Replay' : isPlaying ? 'Pause' : 'Play'}
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          />
        </button>
      </div>
    </>
  )
}