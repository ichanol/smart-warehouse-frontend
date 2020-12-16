import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 25px 70px;

  overflow: auto;
  background-color: ${COLORS.gray[300]};

  .header {
    align-items: center;
    display: flex;

    font-weight: bold;
    letter-spacing: 1px;
    background-color: ${COLORS.gray[300]};
  }
  .header > span {
    font-size: ${FONT.xl};
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .tools-bar-wrapper {
    display: flex;
    flex-direction: column;

    padding: 25px 0;

    background-color: ${COLORS.gray[300]};
    z-index: 2;
  }
  .tools-bar {
    height: 40px;
    display: flex;
    position: relative;
  }
  .tools-bar:not(:first-child) {
    margin-top: 12px;
  }
  .filter-wrapper {
    display: flex;
    margin-right: 12px;
  }
  .number-indicator-wrapper {
    margin-top: 12px;
  }
`

export { Container }
