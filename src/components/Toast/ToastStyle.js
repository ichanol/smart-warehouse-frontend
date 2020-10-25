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
    border-left: 5px solid ${COLORS.yellow[600]};
    background-color: ${COLORS.yellow[300]};
  }
  .error {
    border-left: 5px solid ${COLORS.red[600]};
    background-color: ${COLORS.red[300]};
  }
  .info {
    border-left: 5px solid ${COLORS.blue[600]};
    background-color: ${COLORS.blue[300]};
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
  justify-content: center;
  align-items: center;

  cursor: pointer;

  opacity: 1;
  background-color: ${COLORS.green[300]};
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);

  transition: all 0.25s linear;
  animation: ${({ dismiss }) => (dismiss ? slideOut : slideIn)} 1.5s ease-in-out;

  .toast-detail {
    display: flex;
    flex-direction: column;
  }
  .toast-header {
    font-weight: bold;
    font-size: ${FONT.m};
    letter-spacing: 1px;
  }
  .toast-dismiss {
    position: absolute;
    cursor: pointer;

    right: 20px;
  }
  &:first-child {
    margin-bottom: 0;
  }
`

export { ToastContainer, Container }
