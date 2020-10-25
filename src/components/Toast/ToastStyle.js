import { COLORS, FONT } from '../../Constant'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  0%{
    transform: translateY(100%);
    opacity:0;
  }25%{
    opacity:1;
    transform: translateY(0%);
  }50%{

  }75%{

  }100%{

  }
`
const slideOut = keyframes`
  0%{
    opacity:1;
  }25%{
    transform: translateX(25px);
  }50%{

  }75%{
    transform: translateX(-250%);
  }100%{
    opacity:0;
  }
`

const Container = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 60px;
  margin-left: 20px;
  display: flex;
  flex-direction: column-reverse;

  .warning {
    border-left: 5px solid ${COLORS.yellow[500]};
    background-color: ${COLORS.yellow[200]};
  }
  .error {
    border-left: 5px solid ${COLORS.red[600]};
    background-color: ${COLORS.red[200]};
  }
  .info {
    border-left: 5px solid ${COLORS.blue[600]};
    background-color: ${COLORS.blue[200]};
  }
`

const ToastContainer = styled.div`
  width: 250px;
  height: 80px;

  padding: 10px 25px;
  margin-bottom: 15px;

  position: relative;

  border-radius: 0px;
  border-left: 5px solid ${COLORS.green[600]};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  opacity: 1;
  background-color: ${COLORS.green[200]};
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);

  transition: all 0.25s linear;
  animation: ${({ dismiss }) => (dismiss ? slideOut : slideIn)} 1.5s ease-in-out;

  .toast-detail {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: 30px;
  }
  .toast-header {
    padding-left: 30px;
    width: 100%;
    font-weight: bold;
    font-size: ${FONT.l};
    letter-spacing: 1px;
  }
  .toast-dismiss {
    position: absolute;
    cursor: pointer;

    top: 12px;
    right: 12px;
  }
  &:first-child {
    margin-bottom: 0;
  }

  .toast-icon {
    position: absolute;
    top: 8px;
    left: 12px;
  }
`

export { ToastContainer, Container }
