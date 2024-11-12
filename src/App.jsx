import './index.css'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function App() {

  const [showCanvas, setShowCanvas] = useState(false)
  const headingRef = useRef(null)
  const growingSpan = useRef(null)
  const circleRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // locomotive scroll
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, [])

  // changes the color and canvas state
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {

        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          })

          gsap.to('body', {
            color: '#000',
            duration: 1.2,
            backgroundColor: "#FD2C2A",
            ease: "power2.inOut",
          })

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              })
            }
          })
        }
        else {
          gsap.to('body', {
            color: '#fff',
            duration: 1.2,
            backgroundColor: "#000",
            ease: "power2.inOut",
          })
        }

        return !prevShowCanvas
      })
    }

    const headingElement = headingRef.current;
    headingElement.addEventListener('click', handleClick)

    return () => headingElement.removeEventListener('click', handleClick)

  }, [])

  // circle when hovering over the heading text
  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(circleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(circleRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.in"
      });
    };

    const handleMouseMove = (e) => {
      const rect = headingRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(circleRef.current, {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    headingRef.current.addEventListener('mouseenter', handleMouseEnter);
    headingRef.current.addEventListener('mouseleave', handleMouseLeave);
    headingRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (headingRef.current) {
        headingRef.current.removeEventListener('mouseenter', handleMouseEnter);
        headingRef.current.removeEventListener('mouseleave', handleMouseLeave);
        headingRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // checks if the screen is desktop or mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <span ref={growingSpan} className='growing block fixed top-[-10%] left-[-10%] w-3 md:w-5 h-3 md:h-5 rounded-full'>
      </span>

      <div className='w-full min-h-screen  relative font-[Arial]'>
        {showCanvas && data[0].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}

        <div className='w-full h-screen relative z-[1]'>

          <nav className="w-full p-4 md:p-8 z-50">
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-10 md:gap-0">
              <h2 className='text-3xl md:text-2xl '>Thirty-six-studios.</h2>
              <div className='flex gap-6 md:gap-10 text-sm md:text-md'>
                {["Design", "Development", "Experience"].map((link) => (
                  <a key={link} className="text-md hover:opacity-80 transition-opacity cursor-pointer">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="textcontainer w-full lg:pt-[3%] mt-[30%] px-[5%] md:px-[20%]">
            <div className="text w-full md:w-[40%]">
              <h3 className='text-xl md:text-2xl leading-[1.3]'>
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
              </h3>
            </div>
            <p className='text-sm md:text-md mt-4 w-full md:w-[60%] font-light'>
              We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
            </p>
            <p className='text-sm md:text-md mt-4 w-[20%] md:w-[10%] font-light'>
              Scroll
            </p>
          </div>

          <div className="overflow-x-hidden w-full">
            <div className="w-full absolute bottom-0 left-0 pl-2 md:pl-4">
              <h1 ref={headingRef} className='text-[4rem] md:text-[14rem] tracking-tight leading-none cursor-none'>
                Thirtysixstudios
              </h1>
              <div className="circle" ref={circleRef}>
                <span className="text-[10px] md:text-xs">Click</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full relative h-[140vh] mt-32 ">
        {showCanvas && data[1].map((canvasdets, index) => (
          <Canvas details={canvasdets} />
        ))}

        <div className="textcontainer w-full flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-24 pt-10">
          <div className='flex flex-col items-center w-full md:w-[70%] gap-5'>
            <h1 className='text-lg md:text-xl self-start border-b-2 border-white/20 pb-2'>what we do</h1>
            <img className='w-full md:w-[70%]' src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" />
          </div>

          <p className='font-light w-full md:w-[40%] text-xl md:text-3xl tracking-loose z-[1] mt-8 md:mt-0'>
            We aim to revolutionize digital production in the advertising space, bringing your ideas to life.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
