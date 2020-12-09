import { COLORS, FONT } from '../../Constant'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  0%{
    transform: translateY(100%);
    opacity:0;
  }25%{
    opacity:1;
    transform: translateY(0%);
  }
`
const slideOut = keyframes`
  0%{
    opacity:1;
  }25%{
    transform: translateX(25px);
  }75%{
    transform: translateX(-250%);
  }100%{
    opacity:0;
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 60px;
  margin-left: 20px;
  display: flex;
  flex-direction: column-reverse;

  z-index: 100;

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
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  padding: 10px 25px;
  margin-bottom: 15px;
  border-radius: 0px;
  border-left: 5px solid ${COLORS.green[600]};

  cursor: pointer;
  opacity: 1;
  background-color: ${COLORS.green[200]};
  box-shadow: 0 7px 7px rgba(0, 0, 0, 0.15);
  transition: all 0.15s linear;
  animation: ${({ dismiss }) => (dismiss ? slideOut : slideIn)} 1.5s ease-in-out;

  .toast-detail {
    width: calc(100% - 30px);

    margin-left: 30px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .toast-header {
    width: 100%;

    padding-left: 30px;

    font-weight: bold;
    font-size: ${FONT.l};
    letter-spacing: 1px;
  }
  .toast-dismiss {
    position: absolute;
    top: 12px;
    right: 12px;

    cursor: pointer;
  }
  &:first-child {
    margin-bottom: 0;
  }

  &:hover {
    height: fit-content;
    min-height: 80px;

    transform: scale(1.05);
  }
  &:hover > .toast-detail {
    white-space: initial;
    overflow: initial;
  }
  &:hover > .toast-detail > span {
    word-break: break-word;
  }

  .toast-icon {
    position: absolute;
    top: 8px;
    left: 12px;
  }
`

export { ToastContainer, Container }
