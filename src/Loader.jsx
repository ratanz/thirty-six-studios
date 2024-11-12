import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function Loader({ setIsLoading }) {
  const loaderRef = useRef(null)
  const textRefs = useRef([])

  useEffect(() => {
    const text = "thirtysixstudio"
    // Split text into individual characters
    const chars = text.split('')
    
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => setIsLoading(false)
        })
      }
    })

    // Stagger animation for each character
    tl.from(textRefs.current, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out"
    })
    .to(textRefs.current, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.in",
      delay: 2
    })

  }, [])

  return (
    <div ref={loaderRef} className="loader fixed inset-0 bg-white z-[999] flex items-center justify-center">
      <h1 className="text-black text-4xl md:text-6xl relative">
        {"thirtysixstudio".split('').map((char, index) => (
          <span
            key={index}
            ref={el => textRefs.current[index] = el}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  )
}

export default Loader