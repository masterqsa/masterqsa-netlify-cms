import React from 'react'

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
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
export default function useResponsiveHeroImage(image) {
  const [imageHeight, setImageHeight] = React.useState(null)
  const imageContainer = React.useRef()
  const imageRef = React.useRef()

  const resizeHeroImage = () => {
    if (
      !imageContainer.current ||
      !imageRef.current ||
      !image.childImageSharp
    ) {
      return
    }

    const offsetTop = imageContainer.current.offsetTop

    if (
      imageRef.current.clientHeight - offsetTop <
      imageContainer.current.clientHeight
    ) {
      const newHeight = imageContainer.current.clientHeight + offsetTop
      setImageHeight(newHeight)
    } else if (
      imageRef.current.clientWidth < imageContainer.current.clientWidth
    ) {
      setImageHeight(null)
    } else {
      setImageHeight(null)
    }
  }

  React.useLayoutEffect(() => {
    resizeHeroImage()

    const listener = throttle(() => {
      resizeHeroImage()
    }, 400)

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [image, imageContainer.current, imageRef.current])

  const imageStyle = imageHeight
    ? {
        height: `${imageHeight}px`,
        width: 'auto',
      }
    : {}

  return {
    imageContainerRef: imageContainer,
    imageRef: imageRef,
    imageStyle: imageStyle,
    imageProps: {
      src: image.childImageSharp ? image.childImageSharp.fluid.src : image,
      srcSet: image.childImageSharp
        ? image.childImageSharp.fluid.srcSet
        : undefined,
      alt: '',
      className: 'heroImage',
      style: imageStyle,
      ref: imageRef,
    },
  }
}
