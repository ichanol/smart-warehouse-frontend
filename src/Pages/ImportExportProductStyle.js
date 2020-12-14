import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  overflow: auto;
  background-color: ${COLORS.gray[200]};

  .action-tabs-container {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: flex-end;

    padding-left: 12px;
    padding-top: 15px;

    background-color: ${COLORS.gray[400]};
    z-index: 1;
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

    color: ${COLORS.gray[500]};
    background-color: ${COLORS.gray[300]};
    opacity: 0.8;
    cursor: pointer;
    text-transform: capitalize;
  }
  .focus-tab {
    opacity: 1;
    color: ${COLORS.natural.black};
    background-color: ${COLORS.gray[200]};
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

    padding: 20px;

    filter: blur(${({ blur }) => (blur ? 10 : 0)}px);
    background-color: ${COLORS.gray[200]};
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
    color: ${COLORS.gray[200]};
    cursor: pointer;
  }
  .mock-button-user {
    top: 50px;
  }
  .text-area-wrapper {
    margin-top: 12px;
  }
`

export { Container }
