import { COLORS, FONT } from '../../Constant'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
from{
    opacity: 0;
}
to{
    opacity: 0.5;
}`
const fadeOut = keyframes`
from{
    opacity: 0.5;
}
to{
    opacity: 0;
}`

const TransactionTitle = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  position: sticky;
  top: 0;
  width: fit-content;
  min-width: 100%;

  padding: 0 0 0 20px;
  border-left: 8px solid transparent;

  background-color: ${COLORS.natural.white};
  color: ${COLORS.gray[600]};
  z-index: 1;
  cursor: pointer;

  .chevron-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 20px;

    margin-left: 8px;
  }
  .transaction-title {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
    height: 50px;

    padding: 0 12px;
  }
  .transaction-reference-number {
    > span {
      display: flex;
      align-items: center;
      min-width: 80px;
      max-width: 80px;
    }
  }
  .transaction-timestamp {
    flex: 1.4;

    > span {
      display: flex;
      align-items: center;
      min-width: 175px;
      max-width: 175px;
    }
  }
  .transaction-type {
    > span {
      display: flex;
      align-items: center;
      min-width: 75px;
      max-width: 75px;
    }
  }
  .transaction-remark {
    > span {
      display: flex;
      align-items: center;
      min-width: 140px;
      max-width: 140px;
    }
  }
  .transaction-author {
    justify-content: center;

    > span {
      display: flex;
      align-items: center;
      min-width: 100px;
      max-width: 100px;
    }
  }
  .transaction-menu {
    width: 50px;
    height: 100%;
    max-width: 50px;
  }
`

const TransactionList = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 100%;
  width: fit-content;

  margin: 20px 0 0;

  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15),
    -5px -5px 10px rgba(255, 255, 255, 0.3);

  &:hover {
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.1),
      -10px -10px 20px rgba(255, 255, 255, 0.5);
  }

  .dismiss-context {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    z-index: 4;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }
  input[type='checkbox'] {
    width: 0;
    height: 0;
  }
  .transaction-information {
    display: flex;
    height: 50px;
    width: fit-content;
    min-width: 100%;

    padding: 0 0 0 20px;

    background-color: ${COLORS.natural.white};
    cursor: pointer;
  }
  .chevron-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    margin-left: 8px;
  }
  .transaction-detail {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;

    padding: 0 12px;
  }
  .transaction-reference-number {
    > span {
      min-width: 80px;
      max-width: 80px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .transaction-timestamp {
    flex: 1.4;

    > span {
      min-width: 175px;
      max-width: 175px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .transaction-type {
    > span {
      min-width: 75px;
      max-width: 75px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .transaction-remark {
    > span {
      min-width: 140px;
      max-width: 140px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .transaction-author {
    justify-content: center;

    > span {
      min-width: 100px;
      max-width: 100px;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .transaction-menu {
    width: 50px;
    height: 100%;
    max-width: 50px;
    position: relative;
    justify-content: center;

    padding: 0;

    cursor: pointer;
    background-color: ${COLORS.natural.white};
  }
  .transaction-product-list-container {
    width: 100%;
    max-height: 0;
    display: flex;
    flex-direction: column;

    overflow: hidden;
    background-color: ${COLORS.natural.white};
    transition: all 0.2s ease-in-out;
  }
  input:checked
    + .transaction-information
    + .transaction-product-list-container {
    max-height: 100%;
  }
  input:checked + .transaction-information {
    position: sticky;
    top: 50px;
  }
  .transaction-context-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    max-width: ${({ isOpen }) => (isOpen ? '250px' : '50px')};
    max-height: ${({ isOpen }) => (isOpen ? '500px' : '0px')};
    top: 100%;
    right: 0;

    padding: 12px 0;

    z-index: 6;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15),
      -5px -5px 10px rgba(255, 255, 255, 0.3);
    background-color: ${COLORS.natural.white};
    visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: all 0.2s ease-in-out;
    overflow: hidden;
    color: ${COLORS.gray[700]};
  }
  .transaction-record-menu {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;

    padding: 12px 24px;

    transition: all 0.25s ease-in-out;

    :hover {
      background-color: ${COLORS.gray[200]};
    }
  }
  .transaction-record-menu-title {
    margin: 0 12px;

    white-space: nowrap;
  }

  .export,
  .expired,
  .damaged {
    border-left: 8px solid ${COLORS.red[400]};
  }
  .import {
    border-left: 8px solid ${COLORS.green[600]};
  }

  .product-list {
    height: 50px;
    display: flex;

    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 8px solid transparent;
    padding: 0 20px 0 0;

    font-weight: 500;
    font-size: ${FONT.l};
    color: ${COLORS.gray[800]};
  }

  .product-list-title {
    color: ${COLORS.gray[600]};
  }

  .product-detail {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;

    padding-left: 12px;
  }

  .product-information {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .amount-tag {
    padding: 0 12px;
    border-radius: 4px;

    background-color: ${COLORS.red[100]};
    border: 2px solid ${COLORS.red[300]};
  }
  .add {
    border: 2px solid ${COLORS.green[400]};

    background-color: ${COLORS.green[100]};
  }

  .product-id {
  }
  .product-name {
  }
  .product-amount {
    flex: 0.75;
  }
  .product-balance {
    flex: 0.75;
  }
  .product-location {
  }
  .product-remark {
  }
  .index {
    flex: 0.3;
  }
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  min-height: ${({ tableHeight = 540 }) => tableHeight - 1}px;
  max-height: ${({ tableHeight = 540 }) => tableHeight}px;
  position: relative;

  padding: 0 50px;

  overflow: auto;
  transition: all 0.2s ease-in-out;
  scroll-behavior: smooth;
`

const ArrowWrapper = styled.div`
  position: relative;

  .arrow-wrapper {
    width: 30px;
    height: 30px;
    position: absolute;
    top: calc(100% - 30px);
    left: 50%;
    visibility: ${({ display, scrollHeight }) =>
      display && scrollHeight ? 'visible' : 'hidden'};

    border-radius: 30px;

    transform: translateX(-50%)
      ${({ rotate }) => (rotate ? 'rotate(-90deg)' : 'rotate(90deg)')};
    animation: ${({ display, scrollHeight }) =>
        display && scrollHeight ? fadeIn : fadeOut}
      0.25s ease-in-out;
    transform-origin: center;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
    z-index: 1;
    background-color: ${COLORS.natural.white};
    cursor: pointer;
  }
`

export { TransactionTitle, TransactionList, Table, ArrowWrapper }
