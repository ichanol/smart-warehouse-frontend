import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: ${({ fullWidth }) => fullWidth ? '100%' : '130px'};
  padding: ${({ fullWidth }) => fullWidth ? 'none' : '0 0 0 12px'};

  border-radius: 8px;

  background-color: ${COLORS.natural.white};

  .choice-placeholder {
    display: flex;
    flex: 1;
    background-color: ${COLORS.natural.white};
    height: 100%;
    align-items: center;
    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'initial')};
    padding-left: ${({ isCenter }) => (isCenter ? 0 : 15)}px;
    max-width: ${({ containerWidth = '80px' }) => containerWidth};
    border-radius: 8px;
    cursor: pointer;
    position: relative;
  }

  input {
    height: 0;
    width: 0;
  }
  .show-item-per-page {
    position: absolute;
  }
  input:checked + .choice-container {
    overflow-y: auto;
    height: ${({ multiplier }) =>
      multiplier * 40 <= 120 ? multiplier * 40 : 120}px;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 5;
    display: block;
    border-radius: 8px;
    background-color: ${COLORS.natural.white};
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.125),
      0 -5px 15px 0 rgba(255, 255, 255, 0.35);
  }
  .choice-container {
    position: absolute;
    border-radius: 0;
    height: 0px;
    width: 100%;
    overflow: hidden;
    align-items: ${({ isCenter }) => (isCenter ? 'center' : 'initial')};
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
  }
  .item-per-page-choice {
    min-height: 40px;
    display: flex;
    justify-content: ${({ isCenter }) => (isCenter ? 'center' : 'initial')};
    padding-left: ${({ isCenter }) => (isCenter ? 0 : 15)}px;
    align-items: center;
    border-top: 1px solid ${COLORS.gray[200]};
  }
  .disable-dropdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
  }

  .choice-container::-webkit-scrollbar {
    width: 0px;
  }

  .choice-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .choice-container::-webkit-scrollbar-thumb {
    background: #888;
  }

  .choice-container::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export { Container }
