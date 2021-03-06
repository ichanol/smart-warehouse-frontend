import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};

  border-radius: 8px;

  background-color: ${COLORS.natural.white};

  .placeholder-text {
    padding-left: 12px;

    text-transform: capitalize;
  }
  .choice-placeholder {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    position: relative;
    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'initial')};
    width: ${({ containerWidth = '80px' }) => containerWidth};

    padding-left: ${({ isCenter }) => (isCenter ? 0 : 15)}px;
    border-radius: 8px;

    cursor: pointer;
    background-color: ${COLORS.natural.white};
  }

  input {
    height: 0;
    width: 0;
  }
  .show-item-per-page {
    position: absolute;

    text-transform: capitalize;
  }
  input:checked + .choice-container {
    max-height: ${({ multiplier }) =>
      multiplier * 40 <= 120 ? multiplier * 40 : 120}px;
    width: 100%;
    position: absolute;
    left: 0;
    display: block;

    border-radius: 8px;

    z-index: 5;
    background-color: ${COLORS.natural.white};
    overflow-y: auto;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .choice-container {
    position: absolute;
    max-height: 0px;
    width: 100%;
    align-items: ${({ isCenter }) => (isCenter ? 'center' : 'initial')};
    display: flex;
    flex-direction: column;

    border-radius: 0;

    overflow: hidden;
    transition: all 0.3s ease-in-out;

    ::-webkit-scrollbar {
      width: 0;
    }
  }
  .selected {
    color: ${COLORS.green[600]};
  }
  .item-per-page-choice {
    min-height: 40px;
    display: flex;
    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'initial')};
    align-items: center;

    padding-left: ${({ isCenter }) => (isCenter ? 0 : 15)}px;
    border-top: 1px solid ${COLORS.gray[200]};

    transition: all 0.25s ease-in-out;
    text-transform: capitalize;
    :hover {
      background-color: ${COLORS.gray[200]};
    }
    :nth-child(1) {
      border-top: none;
    }
  }
  .disable-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 4;
  }
`

export { Container }
