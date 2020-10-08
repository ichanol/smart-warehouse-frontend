import { COLORS, FONT } from '../../Constant'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
      background-color: transparent;
    }
    to {
      background-color: rgba(0,0,0,0.5);
    }
`

const fadeOut = keyframes`
    from {
      background-color: rgba(0,0,0,0.5);
    }
    to {
      background-color: transparent;
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
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ isDisplay }) => isDisplay ? 'visible' : 'hidden'};
  animation: ${({ isDisplay }) => isDisplay ? fadeIn : fadeOut} 0.25s linear;
  transition: visibility 0.25s linear;

  .modal {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 30px;
    position: relative;
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.3),
      0 -10px 15px 0 rgba(255, 255, 255, 0.35);
    visibility: ${({ isDisplay }) => isDisplay ? 'visible' : 'hidden'};
    animation: ${({ isDisplay }) => isDisplay ? slideIn : slideOut} 0.25s
      linear;
    transition: visibility 0.25s linear;
  }

  .button-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .activity-wrapper {
    margin: 15px 0;
  }

  .confirm-positive-button,
  .warnning-positive-button,
  .success-positive-button,
  .error-positive-button,
  .confirm-negative-button,
  .warnning-negative-button,
  .success-negative-button,
  .error-negative-button {
    padding: 0 20px;
    height: 45px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    margin: 10px;
  }

  .warnning-negative-button,
  .success-negative-button,
  .error-negative-button {
    display: none;
  }

  .confirm-negative-button {
    color: gray;
    background-color: transparent;
    border: 2px solid transparent;
    flex: 1;
  }

  .confirm-positive-button,
  .error-positive-button,
  .warnning-positive-button,
  .success-positive-button {
    color: white;
    background-color: ${({ color }) => color ? color : COLORS.red[500]};
    border: 2px solid ${({ color }) => color ? color : COLORS.red[500]};
    flex: 1;
  }

  .warnning-positive-button {
    background-color: ${COLORS.yellow[500]};
    border: 2px solid ${COLORS.yellow[500]};
  }

  .success-positive-button {
    background-color: ${COLORS.green[500]};
    border: 2px solid ${COLORS.green[500]};
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
  }

  .header span {
    font-size: 22px;
    font-weight: bold;
  }

  .detail {
    width: 100%;
    max-height: 200px;
    overflow: auto;
    display: flex;
    margin-bottom: 25px;
    padding: 10px;
  }

  .detail span {
    text-align: center;
    width: 100%;
    font-size: ${FONT.s};
    color: rgba(0, 0, 0, 0.75);
  }

  .detail .hightlight {
    font-weight: bold;
    font-size: ${FONT.m};
    color: ${COLORS.red[500]};
  }
`
