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
export default function useResponsiveHeroImage(image, isContentfulImage = false) {
  const [imageHeight, setImageHeight] = React.useState(null)
  const imageContainer = React.useRef()
  const imageRef = React.useRef()

  const resizeHeroImage = React.useCallback(() => {
    if (
      !imageContainer.current ||
      !imageRef.current ||
      (!isContentfulImage && !image.childImageSharp)
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
  }, [isContentfulImage, image])

  React.useLayoutEffect(() => {
    resizeHeroImage()

    const listener = throttle(() => {
      resizeHeroImage()
    }, 400)

    window.addEventListener('resize', listener)

    return () => {
      window.removeEventListener('resize', listener)
    }
  }, [image, resizeHeroImage])

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
      src: isContentfulImage ? (image ? image.fluid.src : image) : (image.childImageSharp ? image.childImageSharp.fluid.src : image),
      srcSet: isContentfulImage ? (image ? image.fluid.srcSet : undefined) : (image.childImageSharp
        ? image.childImageSharp.fluid.srcSet
        : undefined),
      alt: '',
      className: 'heroImage',
      style: imageStyle,
      ref: imageRef,
    },
  }
}
