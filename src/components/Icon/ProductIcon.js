import * as React from 'react'

const ProductIcon = ({ width = 40, fill = 'white' }) => (
  <svg
    viewBox='0 0 850 850'
    fillRule='evenodd'
    clipRule='evenodd'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    imageRendering='optimizeQuality'
    width={width}>
    <path
      d='M272.73 181.58h301.22c25.07 0 47.85 10.26 64.36 26.77 16.51 16.51 26.77 39.29 26.77 64.36v301.22c0 25.07-10.26 47.85-26.77 64.37-16.51 16.51-39.29 26.76-64.36 26.76H272.73c-25.07 0-47.85-10.25-64.37-26.76-16.51-16.52-26.76-39.3-26.76-64.37V272.71c0-25.07 10.25-47.85 26.76-64.36 16.52-16.51 39.3-26.77 64.37-26.77zm160.42 190.74l26.76 22.11V201.21h-26.76v171.11zm46.39-171.11v234.84l-56.2-46.42-56.2 46.42V201.21h-94.41c-19.66 0-37.53 8.05-50.5 21.01-12.96 12.96-21 30.84-21 50.49v301.22c0 19.66 8.04 37.53 21 50.5 12.97 12.96 30.84 21 50.5 21h301.22c19.65 0 37.53-8.04 50.49-21 12.96-12.97 21.01-30.84 21.01-50.5V272.71c0-19.65-8.05-37.53-21.01-50.49s-30.84-21.01-50.49-21.01h-94.41zm-92.78 0v193.22l26.77-22.11V201.21h-26.77z'
      fillRule='nonzero'
      stroke={fill}
      strokeWidth={25}
      fill='none'
    />
  </svg>
)

export default ProductIcon
