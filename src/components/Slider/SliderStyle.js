import { COLORS, FONT } from '../../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 50px;
  width: 350px;
  display: flex;
  border-radius: 50px;
  position: relative;

  background-color: ${({ primaryColor = COLORS.blue[300] }) => primaryColor};

  .knob {
    width: 70px;
    height: 70px;
    position: absolute;
    top: 50%;
    left: 0;

    border-radius: 70px;

    transform: translate(-35px, -50%);
    background-color: black;
    cursor: pointer;
    opacity: 0.5;
  }
  .knob:nth-of-type(4) {
    background-color: blue;
  }
  .cap {
    width: 80px;
    height: 50px;
    position: absolute;

    background-color: ${({ primaryColor = COLORS.blue[300] }) => primaryColor};
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
    top: 0;
    bottom: 0;

    border-radius: 50px;

    background-color: lime;
    cursor: pointer;
  }
`

export { Container }
