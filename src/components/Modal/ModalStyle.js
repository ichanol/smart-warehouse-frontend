import { COLORS, FONT } from '../../Constant'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
      background-color: transparent;
    }    to {
      background-color: rgba(0,0,0,0.5);
    }`

const fadeOut = keyframes`
    from {
      background-color: rgba(0,0,0,0.5);
    }    to {
      background-color: transparent;
    }`

const slideIn = keyframes`
    from{
        transform: translate(0px, 1000px);
        opacity: 0;
    }    to{
        transform: translate(0px, 0px);
        opacity: 1;
    }`

const slideOut = keyframes`
    from{
      transform: translate(0px, 0px);
      opacity: 1;
    }    to{
      transform: translate(0px, 1000px);
      opacity: 0;
    }`

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
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.5);
  visibility: ${({ isDisplay }) => (isDisplay ? 'visible' : 'hidden')};
  animation: ${({ isDisplay }) => (isDisplay ? fadeIn : fadeOut)} 0.25s linear;
  transition: visibility 0.25s linear;

  .modal {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    border-radius: 8px;
    padding: 30px;

    background-color: ${COLORS.natural.white};
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.3),
      0 -10px 15px 0 rgba(255, 255, 255, 0.35);
    visibility: ${({ isDisplay }) => (isDisplay ? 'visible' : 'hidden')};
    animation: ${({ isDisplay }) => (isDisplay ? slideIn : slideOut)} 0.25s
      linear;
    transition: all 0.25s ease-in-out;
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .full-width{
    flex-direction: column-reverse;
    min-height: fit-content;
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
    height: 45px;
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0 20px;
    border-radius: 8px;
    margin: 10px;

    text-transform: uppercase;
  }
  .warnning-negative-button,
  .success-negative-button,
  .error-negative-button {
    display: none;
  }
  .confirm-negative-button {
    flex: 1;

    border: 2px solid ${COLORS.gray[400]};

    color: ${COLORS.gray[600]};
    background-color: transparent;
  }
  .confirm-positive-button,
  .error-positive-button,
  .warnning-positive-button,
  .success-positive-button {
    flex: 1;

    border: 2px solid ${({ color = 'red' }) => COLORS[color][500]};

    color: ${COLORS.natural.white};
    background-color: ${({ color = 'red' }) => COLORS[color][500]};
  }
  .warnning-positive-button {
    border: 2px solid ${COLORS.yellow[500]};

    background-color: ${COLORS.yellow[500]};
  }
  .success-positive-button {
    border: 2px solid ${COLORS.green[500]};

    background-color: ${COLORS.green[500]};
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: center;

    margin-bottom: 25px;
  }
  .header span {
    font-size: ${FONT.xl};
    font-weight: bold;
  }
  .detail {
    width: 100%;
    max-height: 200px;
    display: flex;

    margin-bottom: 25px;
    padding: 10px;

    overflow: auto;
    transition: all 0.2s ease-in-out;
  }
  .detail span {
    width: 100%;

    text-align: center;
    font-size: ${FONT.l};
    color: rgba(0, 0, 0, 0.75);
  }
  .detail .hightlight {
    font-weight: bold;
    font-size: ${FONT.m};
    color: ${COLORS.red[500]};
  }`
