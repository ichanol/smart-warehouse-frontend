import React, { useEffect } from 'react'
import io from 'socket.io-client'
import atomState from '../../Atoms/Atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
const ProductList = () => {
  //const setTest = useSetRecoilState(atomState.modalSelector('555'))
  //console.log(setTest())
  /* const socket = io.connect(process.env.REACT_APP_SOCKET_IO)
  useEffect(() => {
    console.log('mounted')
    socket.emit('join_room', { room: 'tip' })
    socket.on('PRODUCT_SCANNER', ({ success, productData }) => {
      socket.off('PRODUCT_SCANNER')
      console.log('useEffect:', productData)
    })
    return () => {
      console.log('Unmounted')
    }
  }, [])

  const connectwebsocket = () => {
    console.log('connect')
    socket.on('USER_GRANTED', ({ granted, message, room }) => {
      console.log('get data:', message)
      socket.off('PRODUCT_SCANNER')
    })
  }

  const OC = () => {
    console.log('active')
    connectwebsocket()
  } */

  return <h1>ProductList</h1>
}

export default ProductList
