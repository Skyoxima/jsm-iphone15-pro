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

const smallUpVidVw = 70;
const defaultVidVw = 88;

const vidPaddingL = 0;
const vidPaddingR = 0;

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
      xPercent: -25 * videoID,
      // translateX: `${(window.innerWidth >= 640 ? -smallUpVidVw : -defaultVidVw) * (videoID)}vw`,
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
    //* data has been loaded completely? Start playing for the first time
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoID].pause();
      } else {
        startPlay && videoRef.current[videoID].play();
      }
    }
  }, [startPlay, videoID, isPlaying, loadedData])

  const handleLoadedMetadata = (_: number, event: React.SyntheticEvent<HTMLVideoElement, Event>) => setLoadedData((prev) => [...prev, event])

  //>> control the progress animation for the current video's corr. span in the pill below
  useEffect(() => {
    let currentProgess = 0;
    let innerSpan = videoInnerSpanRef.current;

    if (innerSpan[videoID]) {
      let anim = gsap.to(innerSpan[videoID], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          
          //? I'm suspecting that this if check is put in here to avoid unnecessary updation per frame, only update per second
          // console.log(`${videoID}, Progress: ${progress} CurrProgress: ${currentProgess}`);
          if (progress !== currentProgess) {
            currentProgess = progress;
            
            //* max width for progressing (grey), I've kept this different than the original video for consistency
            gsap.to(videoSpanRef.current[videoID], {
              width: window.innerWidth < 480 ? '2rem' : '3rem',
            })
            
            // the span that progress (white)
            gsap.to(innerSpan[videoID], {
              width: `${currentProgess}%`,
              backgroundColor: 'white'
            })
          }
        },

        //* when "progress" = 1 (which are setting manually ↓↓), reset the span back to defaults
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

      //! here the duration of the video is synchronized with the animation duration
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoID].currentTime / videoRef.current[videoID].duration
        );
      }

      //* GSAP ticker is like frame rate, the passed function within 'add' is called every frame
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
      <div id='carousel-tape' className="relative flex w-max left-1/2 -translate-x-[12.5%]">
        {hightlightsSlides.map((list, index) => (
          <div key={index} className="padded-video-container  px-4">
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

      {/*>> Progress bar pill */}
      <div className="relative flex justify-center mt-10">
        <div className="flex-center py-5 px-7 bg-zinc-800 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span key={i} ref={(el: HTMLSpanElement) => { videoSpanRef.current[i] = el }}
              className="relative size-3 mx-2 bg-zinc-300 rounded-full cursor-pointer">
              <span className="absolute size-full rounded-full" ref={(el: HTMLSpanElement) => { videoInnerSpanRef.current[i] = el }}></span>
            </span>
          ))}
        </div>
        {/* pause-play-restart */}
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