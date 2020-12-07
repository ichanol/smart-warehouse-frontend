import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.gray[300]};

  .header {
    height: 35px;
    align-items: center;
    display: flex;
    margin-bottom: 25px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .header > span {
    font-size: ${FONT.xl};
    margin-left: 25px;
  }
  .content {
    flex: 1;
    display: flex;
    padding: 0 25px 25px 25px;
    flex-direction: column;
    position: relative;
  }
  .tools-bar-wrapper {
    display: flex;
    flex-direction: column;
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
    flex: 1;
    max-width: 40px;
    margin-right: 12px;
  }
  .create-button-wrapper {
    position: absolute;
    right: 0;
  }
`

export { Container }
