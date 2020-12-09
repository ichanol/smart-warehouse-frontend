import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding-top: 70px;
  padding: 20px;

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

    padding-left: 12px;

    background-color: ${COLORS.gray[300]};
  }
  .action-tabs {
    height: 35px;
    min-width: 90px;
    display: flex;
    align-items: center;
    position: relative;

    padding: 0 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    color: ${COLORS.gray[700]};
    background-color: ${COLORS.gray[100]};
    opacity: 0.8;
    cursor: pointer;
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
    filter: blur(${({ blur }) => (blur ? 10 : 0)}px);
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 100%;

    padding: 0px;

    filter: blur(${({ blur }) => (blur ? 10 : 0)}px);
    background-color: ${COLORS.natural.white};
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
  .mock-button-product,
  .mock-button-user {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 120px;
    right: 50px;
    width: 120px;
    height: 50px;

    border-radius: 12px;

    background-color: ${COLORS.natural.red};
    z-index: 200;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    color: ${COLORS.natural.white};
    cursor: pointer;
  }
  .mock-button-user {
    top: 50px;
  }
`

export { Container }
