import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  border-radius: ${({ height }) => height}px;
  position: relative;

  background-color: ${({ color }) => COLORS[color][200]};

  .knob {
    width: ${({ knobSize }) => knobSize}px;
    height: ${({ knobSize }) => knobSize}px;
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: ${({ knobSize }) => knobSize}px;

    transform: translate(${({ knobSize }) => -knobSize / 2}px, -50%);
    background-color: ${({ color }) => COLORS[color][600]};
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .inner-knob {
    top: 25%;
    left: 25%;
    right: 25%;
    bottom: 25%;
    position: absolute;
    border-radius: 100%;

    background-color: ${({ color }) => COLORS[color][200]};;
  }
  .cap {
    width: 80px;
    height: ${({ height = 30 }) => height}px;
    position: absolute;

    background-color: ${({ color }) => COLORS[color][200]};;
  }
  .cap-right {
    border-radius: 0 50px 50px 0;
    right: ${({ knobSize }) => -knobSize / 2 - 5}px;
  }
  .cap-left {
    border-radius: 50px 0 0 50px;
    left: ${({ knobSize }) => -knobSize / 2 - 5}px;
  }
  .slide-bar {
    position: absolute;
    left: 0;
    top: -2px;
    bottom: -2px;

    background-color: ${({ color }) => COLORS[color][600]};};
    cursor: pointer;
  }
  .display-number {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    min-width: 100px;
    padding: 12px;

    background-color: ${COLORS.natural.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .display-range{
      white-space: nowrap;
  }
`
export { Container }
