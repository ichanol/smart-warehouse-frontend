import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 100%;
  padding: 20px;
  padding-top: 70px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${COLORS.natural.white};

  .action-tabs-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
    align-items: flex-end;
    background-color: ${COLORS.gray[300]};
    padding-left: 12px;
  }
  .action-tabs {
    height: 35px;
    min-width: 90px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: ${COLORS.gray[700]};
    background-color: ${COLORS.gray[100]};
    opacity: 0.8;
    cursor: pointer;
    position: relative;
  }
  .focus-tab {
    opacity: 1;
    color: ${COLORS.natural.black};
    background-color: ${COLORS.natural.white};
  }
  .disable-tab {
    color: ${COLORS.gray[500]};
    background-color: ${COLORS.gray[400]};
    cursor: not-allowed;
    opacity: 0.65;
  }
  .header {
    height: 35px;
    align-items: center;
    display: flex;
    font-weight: bold;
    letter-spacing: 1px;
    filter: blur(${({ blur }) => blur ? 10 : 0}px);
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.natural.white};
    padding: 0px;
    min-width: 100%;
    filter: blur(${({ blur }) => blur ? 10 : 0}px);
    position: relative;
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .list-manipulate-button {
    display: flex;
  }
  .list-manipulate-button .cancle-button-wrapper {
    margin-left: 10px;
  }
`

export { Container }
