import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
      background-color: rgba(255,255,255,0);
    }
    to {
      background-color: rgba(255,255,255,0.5);
    }
`

const fadeOut = keyframes`
    from {
      background-color: rgba(255,255,255,0.5);
    }
    to {
      background-color: rgba(255,255,255,0);
    }
`

const slideIn = keyframes`
    from{
        transform: translate(0px, 1000px);
        opacity: 0;
    }
    to{
        transform: translate(0px, 0px);
        opacity: 1;
    }
`

const slideOut = keyframes`
    from{
      transform: translate(0px, 0px);
      opacity: 1;
    }
    to{
      transform: translate(0px, 1000px);
      opacity: 0;
    }
`

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  overflow: hidden;
  z-index: 1;

  background-color: rgba(255, 255, 255, 0.5);
  visibility: ${(props) => props.isShow ? 'visible' : 'hidden'};
  animation: ${(props) => props.isShow ? fadeIn : fadeOut} 0.25s linear;
  transition: visibility 0.25s linear;
`

export const ModalBox = styled.div`
  width: ${(props) => props.isIndicator ? 100 : 450}px;
  ${(props) => props.isIndicator ? 'height: 100px;' : null}
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 18px;
  padding: 25px;
  padding-top: ${(props) => props.paddingTop ? 50 : 25}px;
  position: relative;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.3),
    0 -10px 15px 0 rgba(255, 255, 255, 0.35);

  visibility: ${(props) => props.isShow ? 'visible' : 'hidden'};
  animation: ${(props) => props.isShow ? slideIn : slideOut} 0.25s linear;
  transition: visibility 0.25s linear;
`
export const Header = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  span {
    font-size: 26px;
    font-weight: bold;
  }
`

export const Detail = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 20px 0 20px 0;
  span {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.75);
  }
`

export const Button = styled.button`
  width: 60px;
  height: 60px;
  position: absolute;
  background-color: white;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 75px;
  box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.3),
    0 -10px 15px 0 rgba(255, 255, 255, 0.35);
  border: none;
  outline: none;
  transition: box-shadow 0.15s linear;
  &:hover {
    box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.3),
      0 -5px 5px 0 rgba(255, 255, 255, 0.35);
  }
  span {
    color: red;
    font-size: 24px;
  }
`
