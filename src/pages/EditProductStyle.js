import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.gray[200]};

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

  .title,
  .value {
    width: 100%;
    display: flex;
    height: 45px;
    align-items: center;
  }

  .value {
    background-color: rgba(171, 206, 180, 0.25);
    padding-left: 15px;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    cursor: not-allowed;
    margin-bottom: 15px;
  }
`

export { Container }
