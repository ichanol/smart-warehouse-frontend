import { COLORS } from '../../Constant'
import styled from 'styled-components'

const Container = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: relative;

  border-radius: 8px;

  cursor: pointer;
  background-color: ${COLORS.natural.white};

  input[type='checkbox'] {
    width: 0;
    height: 0;
  }
  .date-range-container {
    position: absolute;
    max-height: 0px;
    max-width: 100%;
    top: 100%;
    left: 0;

    border-radius: 8px;

    z-index: 5;
    overflow: hidden;
    background-color: ${COLORS.natural.white};
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15),
      -5px -5px 10px rgba(255, 255, 255, 0.3);
  }

  input:checked + .date-range-container {
    max-height: 350px;
    max-width: 350px;
  }
  .dismiss-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 4;
  }
`

export { Container }
