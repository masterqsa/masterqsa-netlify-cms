import React from 'react'

function debounce(func, delay) {
    let inDebounce
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  }
  function throttle(func, limit) {
    let lastFunc
    let lastRan
    return function() {
      const context = this
      const args = arguments
      if (!lastRan) {
        func.apply(context, args)
        lastRan = Date.now()
      } else {
        clearTimeout(lastFunc)
        lastFunc = setTimeout(function() {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args)
            lastRan = Date.now()
          }
        }, limit - (Date.now() - lastRan))
      }
    }
  }
export default function useResponsiveHeroImage() {
    const media = '(max-width: 768px)'
  
    const [imageWidth, setImageWidth] = React.useState(null)
    const [imageHeight, setImageHeight] = React.useState(null)
    const heroRef = React.useRef()
  
    const resizeHeroImage = (isMobile) => {
      if (!heroRef.current) {
        return
      }
      if (!isMobile) {
        setImageHeight(null)
        setImageWidth(null)
      } else {
        setImageHeight(heroRef.current.clientHeight)
        setImageWidth(heroRef.current.clientWidth)
      }
    }
    
    React.useEffect(() => {
      resizeHeroImage(window.matchMedia(media).matches)

      const listener = throttle(() => {
        resizeHeroImage(window.matchMedia(media).matches)
      }, 400)

      window.addEventListener('resize', listener)
  
    //   const listener = (e) => {
    //     resizeHeroImage(e.matches)
    //   }
  
    //   window.matchMedia(media).addEventListener('change', listener)
  
      return () => {
        window.removeEventListener('resize', listener)
        // window.matchMedia(media).removeEventListener('change', listener)
      }
    }, [])

    // const useWidth = imageWidth > imageHeight
    const useWidth = imageWidth / imageHeight >= 4 / 3
    console.log({ imageWidth, imageHeight, useWidth })

    return {
      heroRef,
      style: imageHeight && imageWidth ? {
        backgroundSize: useWidth ? `calc(100vw + ${heroRef.current.offsetLeft}px) auto` : `auto ${imageHeight}px`,
        backgroundPosition: `center 0`,
      } : {},
    }
  }
