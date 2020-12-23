import { COLORS, FONT } from '../Constant'

import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 0 70px 25px 70px;

  overflow: auto;
  background-color: ${COLORS.natural.white};

  hr {
    opacity: 0.5;
  }
  .header {
    align-items: center;
    display: flex;

    padding: 25px 0;

    font-weight: bold;
    letter-spacing: 1px;
    z-index: 2;
  }
  .header span {
    font-size: ${FONT.xl};
  }
  .sticky {
    position: sticky;
    top: 0;

    background-color: ${COLORS.natural.white};
  }
  .z1 {
    z-index: 1;
  }
  .no-border {
    border: none;
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

    margin-top: 24px;
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
  .text-area-wrapper {
    margin-top: 25px;
  }
  .back-button {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;

    border: 1px solid ${COLORS.gray[500]};
    border-radius: 8px;

    color: ${COLORS.gray[600]};
    cursor: pointer;
  }
  .download-button {
    height: 40px;
    width: fit-content;
    display: flex;
    justify-content: center;

    padding: 0 12px 0 0;
    border-radius: 4px;
    border: 1px solid ${COLORS.gray[600]};

    overflow: hidden;
    color: ${COLORS.natural.black};
    cursor: pointer;
    opacity: 0.4;
    transition: all 0.2s ease-in-out;

    :hover {
      opacity: 0.6;
      background-color: ${COLORS.gray[200]};
    }
    > span {
      display: flex;
      align-items: center;
    }
  }
`

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;

  .transaction-information-column {
    display: flex;
  }
  .flex-end {
    display: flex;
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
  .margin-bottom {
    margin-bottom: 16px;
  }
  .toggle-button-wrapper,
  .download-button-wrapper {
    flex: 1;
  }
`

const ProductTable = styled.div`
  min-height: ${({ height = 500 }) => height - 1}px;
  max-height: ${({ height = 500 }) => height}px;
  width: 100%;

  border: 1px solid ${COLORS.gray[300]};
  padding: 0 12px;
  border-radius: 8px;

  overflow: auto;
`

const EditSection = styled.div`
  display: flex;
  flex-direction: column;

  .header-wrapper {
    display: flex;
    flex-direction: column;

    padding-bottom: 12px;

    z-index: 2;
  }
`

const ProductList = styled.div`
  display: flex;
  height: 50px;
  width: 100%;

  border-top: 1px solid ${COLORS.gray[200]};

  background-color: ${COLORS.natural.white};

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

const ProductListWrapper = styled.label`
  display: flex;
  flex-direction: column;

  padding-left: 12px;

  z-index: 0;

  :nth-child(1) {
    border-top: none;
  }
  input[type='checkbox'] {
    display: none;
  }
  .product-remark {
    max-height: 0;
    display: flex;
    flex-direction: column;

    transition: all 0.2s ease-in-out;
    overflow: hidden;
    z-index: 0;
  }
  input:checked + .product-remark {
    max-height: 1000px;
  }
`

const SpanInput = styled.span`
  max-width: 100%;

  outline: none;
  overflow: scroll !important;
  text-overflow: unset !important;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
  :empty::before {
    color: ${COLORS.gray[600]};
    content: '${({ sign = '' }) => sign}' attr(placeholder);
  }
  ::before {
    content: '${({ sign = '' }) => sign}';
  }
`

const DefaultProductListTable = styled.label`
  input[type='checkbox'] {
    display: none;
  }
  .chevron-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 8px;

    transition: all 0.2s ease-in-out;
    transform: rotate(-90deg);
    cursor: pointer;
  }
  .product-list-wrapper {
    display: flex;
  }
  .table-wrapper {
    max-height: 0;

    margin-top: 12px;

    transition: all 0.2s ease-in-out;
    overflow: hidden;
  }
  input:checked + .transaction-information + .table-wrapper {
    max-height: 100%;
  }
  input:checked
    + .transaction-information
    > .product-list-wrapper
    > .chevron-wrapper {
    transform: rotate(0deg);
  }
`

export {
  Container,
  DetailSection,
  ProductTable,
  EditSection,
  ProductList,
  SpanInput,
  DefaultProductListTable,
  ProductListWrapper,
}
