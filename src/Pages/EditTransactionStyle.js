import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 25px 70px;

  overflow: auto;
  background-color: ${COLORS.natural.white};

  .header {
    height: 35px;
    align-items: center;
    display: flex;

    margin-bottom: 24px;

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

    /* background-color: ${COLORS.gray[100]}; */
  }
  .dropdown-wrapper {
    height: 40px;
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
  .transaction-title {
    margin-bottom: 18px;
    font-size: ${FONT.xl};
  }
`

const TransactionDetail = styled.div`
  display: flex;
  flex-direction: column;

  .transaction-information-column {
    display: flex;
  }
  .transaction-information {
    display: flex;
    flex: 1;
    height: 30px;
    min-height: 30px;
    align-items: center;
  }
  .transaction-information-title {
  }
  .transaction-information-data {
    margin-left: 12px;
  }
  .text-area-wrapper {
    margin-top: 8px;
  }
  .flex-end {
    justify-content: flex-end;
  }
`

const ProductTable = styled.div`
  height: 85vh;
  /* max-height: 450px; */
  width: 100%;

  background-color: red;
  overflow: auto;
`
export { Container, TransactionDetail, ProductTable }
