import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 20px;

  overflow: auto;
  background-color: ${COLORS.gray[200]};

  .dropdown-wrapper {
    flex: 1;
    height: 45px;
    min-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 40px 0 15px 0;
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
    position: relative;

    padding: 25px;

    background-color: ${COLORS.natural.white};
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
