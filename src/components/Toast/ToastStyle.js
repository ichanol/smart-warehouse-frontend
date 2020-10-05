import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
    from{
        transform: translate(0px, 20px);
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
      transform: translate(0px, 20px);
      opacity: 0;
    }
`

const ToastContainer = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 60px;
  margin-left: 20px;
  padding: 10px 25px;
  background-color: rgb(56, 240, 145);
  color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 7px solid rgb(24, 201, 109);
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);

  visibility: ${(props) => props.isDisplay ? 'visible' : 'hidden'};
  animation: ${(props) => props.isDisplay ? slideIn : slideOut} 0.25s linear;
  transition: all 0.25s linear;

  .toast-detail {
    display: flex;
    flex-direction: column;
  }
  .toast-header {
    font-weight: bold;
    font-size: 14pt;
    letter-spacing: 1px;
  }
  .toast-dismiss {
    margin-left: 25px;
    cursor: pointer;
  }
`

export { ToastContainer }
