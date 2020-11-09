import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.gray[200]};

  .dropdown-wrapper {
    margin: 40px 0 15px 0;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    flex: 1;
    height: 45px;
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .dropdown-wrapper .placeholder {
    position: absolute;
    top: -50px;
    left: 0;
    opacity: 1;
    transform: translateY(45%);
    transition: all 0.25s ease-in-out;
  }

  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.natural.white};
    padding: 25px;
    position: relative;
  }
  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
  }
  .cancel-button-wrapper {
    margin-right: 20px;
  }
  .cancel-button-wrapper > button {
    border: none;
    color: ${COLORS.gray[500]};
  }
  .cancel-button-wrapper > button:active {
    border: none;
    background-color: transparent;
    color: ${COLORS.gray[500]};
  }
`

export { Container }
