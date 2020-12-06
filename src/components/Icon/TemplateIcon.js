import { COLORS } from '../../Constant'
import React from 'react'

const TemplateIcon = ({ width = 20, fill = COLORS.gray[700] }) => {
  return (
    <svg viewBox='0 0 64 80' width={width} fill={fill}>
      <path
        className='prefix__st0'
        d='M56 0H8C3.6 0 0 3.6 0 8v48c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V8c0-4.4-3.6-8-8-8zm4.8 56c0 2.7-2.1 4.8-4.8 4.8H8c-2.7 0-4.8-2.1-4.8-4.8V8c0-2.7 2.1-4.8 4.8-4.8h48c2.7 0 4.8 2.1 4.8 4.8v48z'
        fillRule='evenodd'
      />
      <path
        className='prefix__st0'
        d='M14 28h12c1.1 0 2-.9 2-2V14c0-1.1-.9-2-2-2H14c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zm2-12h8v8h-8v-8zM51 12H37c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1zM51 24H37c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1zM51 36H13c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h38c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1zM51 48H13c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h38c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1z'
        fillRule='evenodd'
      />
    </svg>
  )
}

export default TemplateIcon
