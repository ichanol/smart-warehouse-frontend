import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.label`
  width: 125px;
  position: relative;
  display: flex;
  flex-direction: column-reverse;

  .create-new-button-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 8px;

    background-color: ${COLORS.green[500]};
    color: ${COLORS.natural.white};
    letter-spacing: 0.5px;
    cursor: pointer;
  }
  input[type='checkbox'] {
    width: 0;
    height: 0;
  }
  .dismiss-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 4;
  }
  .create-new-context-menu {
    position: absolute;
    top: 100%;
    right: 0;
    max-width: 100%;
    max-height: 0;

    border-radius: 8px;

    z-index: 5;
    overflow: hidden;
    background-color: ${COLORS.natural.white};
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15),
      -5px -5px 10px rgba(255, 255, 255, 0.3);
  }
  .create-new-button-menu {
    min-width: 100%;
    height: 50px;
    display: flex;
    align-items: center;

    padding: 24px;

    cursor: pointer;
    transition: all 0.25s ease-in-out;
    background-color: transparent;

    :hover {
      background-color: ${COLORS.gray[200]};
    }
  }

  input[type='file'] {
    width: 0;
    height: 0;
  }

  .create-new-menu-title {
    padding: 0 8px;

    white-space: nowrap;
    color: ${COLORS.gray[700]};
  }

  input:checked + .create-new-context-menu {
    max-height: 200px;
    max-width: 200%;

    padding: 12px 0;
  }
`

export { Container }
