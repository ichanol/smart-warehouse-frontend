import React, { useEffect, useRef, useState } from 'react'

import { Container } from './SliderStyle'

const Slider = ({ height = 30, width = 350, knobSize = 50 }) => {
  const knobRef = useRef([])
  const knobAnimatedValue = useRef({ x: 0, y: 0, isGrant: false })

  const onMouseDown = (event, ref) => {
    event.preventDefault()
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

  const onMouseMove = (event, ref) => {
    event.preventDefault()
    const sliderWidth = width
    const knobWidth = knobSize

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
          (dx > 0 && Math.round(newLeftPositionPercent) < 100) ||
          (dx < 0 && Math.round(newLeftPositionPercent) > 0)
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
        }
      } else if (ref === 1) {
        if (
          (dx > 0 && Math.round(newLeftPositionPercent) < 100) ||
          (dx < 0 && Math.round(newLeftPositionPercent) > 0)
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

        if (dx > 0 && newRightBarPositionPercent > 0) {
          knobRef.current[0].style.left = newLeftPositionPercent + '%'
          knobRef.current[2].style.left = newLeftPositionPercent + '%'

          knobRef.current[1].style.left = newSecondaryLeftPositionPercent + '%'
          knobRef.current[2].style.right = newRightBarPositionPercent + '%'
        } else if (dx < 0 && newLeftPositionPercent > 0) {
          knobRef.current[0].style.left = newLeftPositionPercent + '%'
          knobRef.current[2].style.left = newLeftPositionPercent + '%'

          knobRef.current[1].style.left = newSecondaryLeftPositionPercent + '%'
          knobRef.current[2].style.right = newRightBarPositionPercent + '%'
        }
      }
    }
  }

  const onMouseUp = (event) => {
    knobAnimatedValue.current.isGrant = false
  }

  return (
    <Container height={height} width={width} knobSize={knobSize}>
      <div className='cap cap-left' />
      <div className='cap cap-right' />
      <div
        className='knob'
        onMouseDown={(event) => onMouseDown(event, 0)}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        onMouseMove={(event) => onMouseMove(event, 0)}
        ref={(ref) => (knobRef.current[0] = ref)}>
        <div className='inner-knob' />
      </div>
      <div
        className='knob'
        onMouseDown={(event) => onMouseDown(event, 1)}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        onMouseMove={(event) => onMouseMove(event, 1)}
        ref={(ref) => (knobRef.current[1] = ref)}>
        <div className='inner-knob' />
      </div>
      <div
        className='slide-bar'
        onMouseDown={(event) => onMouseDown(event)}
        onMouseMove={(event) => onMouseMove(event, 2)}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseUp}
        ref={(ref) => (knobRef.current[2] = ref)}
      />
    </Container>
  )
}

export default Slider
