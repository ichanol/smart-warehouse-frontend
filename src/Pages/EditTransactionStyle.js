import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 70px 25px 70px;

  overflow: auto;
  background-color: ${COLORS.natural.white};

  .header {
    align-items: center;
    display: flex;

    padding: 25px 0;

    font-weight: bold;
    letter-spacing: 1px;
    z-index: 1;
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .sticky {
    position: sticky;
    top: 0;

    background-color: ${COLORS.natural.white};
  }
  .capitalize {
    text-transform: capitalize;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .dropdown-wrapper {
    height: 40px;
    width: fit-content;
    display: flex;

    border: 1px solid ${COLORS.gray[400]};
    border-radius: 8px;
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

    text-transform: capitalize;
  }
  .transaction-information {
    display: flex;
    flex: 1;
    height: 30px;
    min-height: 30px;
    align-items: center;
  }
  .transaction-information-data {
    margin-left: 12px;
  }
`

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;

  .transaction-information-column {
    display: flex;
  }
  .text-area-wrapper {
    margin-top: 8px;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .action {
    padding: 0 12px;
    border-radius: 4px;

    background-color: ${COLORS.red[100]};
    border: 2px solid ${COLORS.red[300]};
  }
  .add {
    border: 2px solid ${COLORS.green[400]};

    background-color: ${COLORS.green[100]};
  }
`

const ProductTable = styled.div`
  min-height: ${({ height = 500 }) => height}px;
  max-height: ${({ height = 500 }) => height + 1}px;
  width: 100%;

  margin-top: 12px;

  overflow: auto;
`

const EditSection = styled.div`
  display: flex;
  flex-direction: column;

  .header-wrapper {
    display: flex;
    flex-direction: column;

    padding-bottom: 12px;

    z-index: 1;
  }
  .text-area-wrapper {
    margin-top: 25px;
  }
`

const ProductList = styled.div`
  display: flex;
  height: 50px;
  width: 100%;

  border-top: 1px solid ${COLORS.gray[200]};

  :nth-child(1) {
    border-top: none;
  }

  .serial-number,
  .product-name,
  .amount,
  .balance,
  .location {
    flex: 1;
    display: flex;
    align-items: center;

    padding-left: 12px;

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .location {
    flex: 1.25;
    padding-left: 35px;
  }
  .amount,
  .balance {
    justify-content: flex-end;
    flex: 0.5;
    max-width: 120px;
  }
  .amount-tag {
    padding: 0 12px;
    border-radius: 4px;

    background-color: ${COLORS.red[100]};
    border: 2px solid ${COLORS.red[300]};
  }
  .import {
    border: 2px solid ${COLORS.green[400]};

    background-color: ${COLORS.green[100]};
  }
`

const SpanInput = styled.span`
/* color: transparent; */
&[placeholder]:empty::before {
  content: '${({ sign = '' }) => sign}' attr(placeholder);
}
::before {
    color: ${COLORS.natural.black};
    content: '${({ sign = '' }) => sign}';
  }
/* &[placeholder]:empty:focus::before {
    content: "";
} */
  /* ::before {
    color: ${COLORS.natural.black};
    content: '${({ sign = '' }) => sign}';
  }
  ::after{
    color: ${COLORS.natural.black};
    content: '${({ amount = '' }) => amount}';
  } */
`

export {
  Container,
  DetailSection,
  ProductTable,
  EditSection,
  ProductList,
  SpanInput,
}
