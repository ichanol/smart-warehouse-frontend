import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  display: flex;
  border-radius: 50px;
  position: relative;

  background-color: ${({ primaryColor = COLORS.blue[200] }) => primaryColor};

  .knob {
    width: ${({ knobSize }) => knobSize}px;
    height: ${({ knobSize }) => knobSize}px;
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 70px;

    transform: translate(-35px, -50%);
    background-color: ${({ barColor = COLORS.blue[600] }) => barColor};
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

    background-color: ${COLORS.blue[200]};
  }
  .cap {
    width: 80px;
    height: ${({ height = 30 }) => height}px;
    position: absolute;

    background-color: ${({ primaryColor = COLORS.blue[200] }) => primaryColor};
  }
  .cap-right {
    border-radius: 0 50px 50px 0;
    right: -40px;
  }
  .cap-left {
    border-radius: 50px 0 0 50px;
    left: -40px;
  }
  .slide-bar {
    position: absolute;
    left: 0;
    top: -2px;
    bottom: -2px;

    background-color: ${({ barColor = COLORS.blue[600] }) => barColor};
    cursor: pointer;
  }
`

export { Container }
