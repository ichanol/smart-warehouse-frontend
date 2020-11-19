import React, { useEffect, useRef, useState } from 'react'

import { Container } from './SliderStyle'

const Slider = ({
  height = 15,
  width = 300,
  knobSize = 30,
  min = 0,
  max = 999999,
  color = 'green',
  setMin,
  setMax,
}) => {
  const knobRef = useRef([])
  const knobAnimatedValue = useRef({ x: 0, isGrant: false })
  const [sliderValue, setSliderValue] = useState({ min: 0, max: 0 })
  const [divider, setDivider] = useState(0)

  useEffect(() => {
    if (min && max) {
      setSliderValue({ min: min, max: min })
    }
    if (max.toString().length > 2) {
      setDivider(max.toString().length - 2)
    }
  }, [])

  const setMinHandler = (value) => setMin(value)

  const setMaxHandler = (value) => setMax(value)

  const onMouseDown = (event, ref, type) => {
    if (type === 'touch') {
      event.clientX = event.changedTouches[0].clientX
    } else {
      event.preventDefault()
    }
    knobAnimatedValue.current.x = event.clientX
    knobAnimatedValue.current.isGrant = true

    if (ref === 0) {
      knobRef.current[0].style.zIndex = 2
      knobRef.current[1].style.zIndex = 1
    } else if (ref === 1) {
      knobRef.current[0].style.zIndex = 1
      knobRef.current[1].style.zIndex = 2
    }
  }

  const onMouseMove = (event, ref, type) => {
    if (type === 'touch') {
      event.clientX = event.changedTouches[0].clientX
    } else {
      event.preventDefault()
    }
    const sliderWidth = width

    const oldLeftPositionPercent =
      knobRef.current[ref].style.left.split('%')[0] * 1
    const x0 = knobAnimatedValue.current.x
    const x = event.clientX
    const dx = x - x0
    const dxPercent = (dx * 100) / sliderWidth
    knobAnimatedValue.current.x = event.clientX
    const newLeftPositionPercent = oldLeftPositionPercent + dxPercent

    if (knobAnimatedValue.current.isGrant) {
      const primaryKnobLeftPositionPercent =
        knobRef.current[0].style.left.split('%')[0] * 1
      const secondaryKnobLeftPositionPercent =
        knobRef.current[1].style.left.split('%')[0] * 1

      if (ref === 0) {
        if (
          (dx > 0 && newLeftPositionPercent < 100) ||
          (dx < 0 && newLeftPositionPercent > 0)
        ) {
          if (
            primaryKnobLeftPositionPercent > secondaryKnobLeftPositionPercent
          ) {
            knobRef.current[ref].style.left =
              secondaryKnobLeftPositionPercent + '%'
            knobRef.current[2].style.left = 'unset'
          } else {
            knobRef.current[ref].style.left = newLeftPositionPercent + '%'
            knobRef.current[2].style.left = newLeftPositionPercent + '%'
          }

          const updatedMin = Math.round(
            min + ((max - min) * newLeftPositionPercent) / 100,
          )

          const newMin =
            updatedMin < min
              ? min
              : Math.round(updatedMin / Math.pow(10, divider)) *
                Math.pow(10, divider)

          setSliderValue({
            ...sliderValue,
            min: newMin,
          })
          setMinHandler(newMin)
        }
      } else if (ref === 1) {
        if (
          (dx > 0 && newLeftPositionPercent < 100) ||
          (dx < 0 && newLeftPositionPercent > 0)
        ) {
          if (
            secondaryKnobLeftPositionPercent < primaryKnobLeftPositionPercent
          ) {
            knobRef.current[ref].style.left =
              primaryKnobLeftPositionPercent + '%'
            knobRef.current[2].style.right = 'unset'
          } else {
            knobRef.current[ref].style.left = newLeftPositionPercent + '%'
            knobRef.current[2].style.right = 100 - newLeftPositionPercent + '%'
          }
          const updatedMax = Math.round(
            min + ((max - min) * newLeftPositionPercent) / 100,
          )
          const newMax =
            updatedMax > max
              ? max
              : Math.round(updatedMax / Math.pow(10, divider)) *
                Math.pow(10, divider)
          setSliderValue({
            ...sliderValue,
            max: newMax,
          })

          setMaxHandler(newMax)
        }
      } else if (ref === 2) {
        const oldRightBarPositionPercent =
          knobRef.current[2].style.right.split('%')[0] * 1
        const newRightBarPositionPercent =
          oldRightBarPositionPercent - dxPercent

        const oldSecondaryLeftPositionPercent =
          knobRef.current[1].style.left.split('%')[0] * 1
        const newSecondaryLeftPositionPercent =
          oldSecondaryLeftPositionPercent + dxPercent

        if (
          (dx > 0 && newRightBarPositionPercent >= 0) ||
          (dx < 0 && newLeftPositionPercent > 0)
        ) {
          knobRef.current[0].style.left = newLeftPositionPercent + '%'
          knobRef.current[2].style.left = newLeftPositionPercent + '%'

          knobRef.current[1].style.left = newSecondaryLeftPositionPercent + '%'
          knobRef.current[2].style.right = newRightBarPositionPercent + '%'
        }

        const updatedMin = Math.round(
          min + ((max - min) * newLeftPositionPercent) / 100,
        )
        const updatedMax = Math.round(
          min + ((max - min) * newSecondaryLeftPositionPercent) / 100,
        )
        const newMin =
          updatedMin < min
            ? min
            : Math.round(updatedMin / Math.pow(10, divider)) *
              Math.pow(10, divider)
        const newMax =
          updatedMax > max
            ? max
            : Math.round(updatedMax / Math.pow(10, divider)) *
              Math.pow(10, divider)

        setSliderValue({
          ...sliderValue,
          min: newMin,
          max: newMax,
        })
        setMinHandler(newMin)
        setMaxHandler(newMax)
      }
    }
  }

  const onMouseUp = (event) => {
    knobAnimatedValue.current.isGrant = false
  }

  return (
    <Container height={height} width={width} knobSize={knobSize} color={color}>
      <div className='cap cap-left' />
      <div className='cap cap-right' />
      <div
        className='knob'
        onMouseDown={(event) => onMouseDown(event, 0)}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        onMouseMove={(event) => onMouseMove(event, 0)}
        onTouchMove={(event) => onMouseMove(event, 0, 'touch')}
        onTouchStart={(event) => onMouseDown(event, 0, 'touch')}
        ref={(ref) => (knobRef.current[0] = ref)}>
        <div className='inner-knob' />
      </div>
      <div
        className='knob'
        onMouseDown={(event) => onMouseDown(event, 1)}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        onMouseMove={(event) => onMouseMove(event, 1)}
        onTouchMove={(event) => onMouseMove(event, 1, 'touch')}
        onTouchStart={(event) => onMouseDown(event, 1, 'touch')}
        ref={(ref) => (knobRef.current[1] = ref)}>
        <div className='inner-knob' />
      </div>
      <div
        className='slide-bar'
        onMouseDown={(event) => onMouseDown(event)}
        onMouseMove={(event) => onMouseMove(event, 2)}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        onTouchMove={(event) => onMouseMove(event, 2, 'touch')}
        onTouchStart={(event) => onMouseDown(event, 2, 'touch')}
        ref={(ref) => (knobRef.current[2] = ref)}>
        <div className='display-number'>
          <span className='display-range'>
            {sliderValue.min.toLocaleString()} - {sliderValue.max.toLocaleString()}
          </span>
        </div>
      </div>
    </Container>
  )
}

export default Slider
